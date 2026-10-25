// Sign-in (email/password) + Firestore sync. Loaded only when Firebase is configured.
//
// Firestore layout
//   users/{uid}                 profile: email, name, access, createdAt, lastLoginAt, lastSeenAt,
//                               device, current (last unit opened), stats (summary for the admin)
//   users/{uid}/private/progress  { state: <JSON of the local store>, updatedAt }
//   users/{uid}/events/{id}     activity log: { type, course, unit, score, at, device }
//   admins/{uid}                exists => this user can open /admin
import { initializeApp } from 'firebase/app';
import {
  getAuth, connectAuthEmulator, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  updateProfile, sendPasswordResetEmail, sendEmailVerification, signOut as fbSignOut,
} from 'firebase/auth';
import {
  initializeFirestore, connectFirestoreEmulator, persistentLocalCache, persistentMultipleTabManager, doc, getDoc, setDoc, updateDoc,
  addDoc, collection, onSnapshot, serverTimestamp, query, orderBy, limit, getDocs,
} from 'firebase/firestore';
import { firebaseConfig } from './firebase.js';
import { getState, replaceAll, resetAll, subscribe, onTrack, update } from './store.js';
import { courses, has } from './content.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'ar';
const db = initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) });
if (import.meta.env.VITE_USE_EMULATOR === 'true') {
  // local testing with `firebase emulators:start`
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}

// ---------- tiny observable auth state ----------
let authState = { ready: false, user: null, profile: null, isAdmin: false };
const subs = new Set();
const setAuth = (patch) => {
  authState = { ...authState, ...patch };
  subs.forEach((f) => f());
};
export const getAuthState = () => authState;
export const subscribeAuth = (f) => (subs.add(f), () => subs.delete(f));

export function deviceInfo() {
  const ua = navigator.userAgent;
  const os = /Android/i.test(ua) ? 'Android' : /iPhone|iPad|iPod/i.test(ua) ? 'iOS' : /Windows/i.test(ua) ? 'Windows' : /Mac OS/i.test(ua) ? 'macOS' : /Linux/i.test(ua) ? 'Linux' : 'Other';
  const browser = /Edg\//.test(ua) ? 'Edge' : /OPR\//.test(ua) ? 'Opera' : /Chrome\//.test(ua) ? 'Chrome' : /Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : 'Other';
  return {
    os,
    browser,
    mobile: /Mobi|Android|iPhone/i.test(ua),
    pwa: window.matchMedia?.('(display-mode: standalone)').matches || false,
    screen: `${window.screen?.width}x${window.screen?.height}`,
    lang: navigator.language,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

function summary(s) {
  let ready = 0, read = 0;
  const scores = [];
  for (const c of courses)
    for (const u of c.units) {
      if (!has('lesson', c.id, u.id)) continue;
      ready++;
      const k = `${c.id}/${u.id}`;
      if (s.read[k]) read++;
      if (s.quiz[k]?.best != null) scores.push(s.quiz[k].best);
    }
  return {
    unitsRead: read,
    unitsTotal: ready,
    quizzesTaken: Object.values(s.quiz).reduce((a, q) => a + (q.attempts || 0), 0),
    avgBest: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null,
    mistakes: Object.keys(s.mistakes).length,
    answered: Object.values(s.qstats).reduce((a, q) => a + q.r + q.w, 0),
  };
}

// ---------- sync ----------
let stop = [];
let pushTimer = null;
let sessionLogged = false;

function cleanup() {
  stop.forEach((f) => f());
  stop = [];
  clearTimeout(pushTimer);
}

async function startSession(user) {
  const uref = doc(db, 'users', user.uid);
  const pref = doc(db, 'users', user.uid, 'private', 'progress');
  const device = deviceInfo();

  const snap = await getDoc(uref);
  if (!snap.exists()) {
    await setDoc(uref, {
      email: user.email,
      name: user.displayName || '',
      access: false,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      lastSeenAt: serverTimestamp(),
      device,
    });
  } else {
    // the sign-up form may have created the document first (with just the name)
    const extra = snap.data().createdAt ? {} : { createdAt: serverTimestamp() };
    await updateDoc(uref, { lastLoginAt: serverTimestamp(), lastSeenAt: serverTimestamp(), device, email: user.email, ...extra });
  }

  // admin flag
  getDoc(doc(db, 'admins', user.uid)).then((a) => setAuth({ isAdmin: a.exists() })).catch(() => setAuth({ isAdmin: false }));

  // live profile (access can be switched on by the admin while the student waits)
  stop.push(onSnapshot(uref, (d) => setAuth({ profile: d.data() || null, ready: true })));

  // merge progress: the newer copy wins; another account's local data is never uploaded
  const local = getState();
  const remoteSnap = await getDoc(pref);
  const remote = remoteSnap.exists() ? remoteSnap.data() : null;
  const sameOwner = !local.meta?.uid || local.meta.uid === user.uid;
  if (remote?.state && (!sameOwner || (remote.updatedAt || 0) > (local.meta?.updatedAt || 0))) {
    const data = JSON.parse(remote.state);
    replaceAll({ ...data, meta: { ...data.meta, uid: user.uid, updatedAt: remote.updatedAt } }, { silent: true });
  } else if (!sameOwner) {
    resetAll();
  }
  update((s) => (s.meta = { ...s.meta, uid: user.uid }), { silent: true });

  const push = () => {
    const s = getState();
    const at = s.meta?.updatedAt || Date.now();
    setDoc(pref, { state: JSON.stringify(s), updatedAt: at }).catch(() => {});
    updateDoc(uref, { lastSeenAt: serverTimestamp(), current: s.last || null, stats: summary(s) }).catch(() => {});
  };
  if (!remote || (local.meta?.updatedAt || 0) > (remote.updatedAt || 0)) push();
  stop.push(
    subscribe(() => {
      clearTimeout(pushTimer);
      pushTimer = setTimeout(push, 2500);
    }),
  );
  const flush = () => document.visibilityState === 'hidden' && (clearTimeout(pushTimer), push());
  document.addEventListener('visibilitychange', flush);
  stop.push(() => document.removeEventListener('visibilitychange', flush));

  // activity log
  const log = (type, data) => addDoc(collection(db, 'users', user.uid, 'events'), { type, ...data, at: serverTimestamp(), device }).catch(() => {});
  stop.push(onTrack(log));
  if (!sessionLogged) {
    sessionLogged = true;
    log('login', {});
  }
}

onAuthStateChanged(auth, async (user) => {
  cleanup();
  if (!user) {
    sessionLogged = false;
    setAuth({ ready: true, user: null, profile: null, isAdmin: false });
    return;
  }
  setAuth({ user, ready: false });
  try {
    await startSession(user);
  } catch (e) {
    console.error(e);
    setAuth({ ready: true });
  }
});

// ---------- actions ----------
const MESSAGES = {
  'auth/invalid-email': 'الإيميل مكتوب غلط',
  'auth/missing-password': 'اكتب الباسورد',
  'auth/weak-password': 'الباسورد ضعيف (6 حروف على الأقل)',
  'auth/email-already-in-use': 'الإيميل ده عليه حساب بالفعل، سجّل دخول',
  'auth/invalid-credential': 'الإيميل أو الباسورد غلط',
  'auth/user-not-found': 'مفيش حساب بالإيميل ده',
  'auth/wrong-password': 'الباسورد غلط',
  'auth/too-many-requests': 'محاولات كتير، استنى شوية وجرب تاني',
  'auth/network-request-failed': 'مفيش إنترنت',
};
export const authError = (e) => MESSAGES[e?.code] || e?.message || 'حصل خطأ';

export const signIn = (email, password) => signInWithEmailAndPassword(auth, email.trim(), password);

export async function signUp(name, email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
  if (name) await updateProfile(cred.user, { displayName: name.trim() });
  await setDoc(doc(db, 'users', cred.user.uid), { name: name.trim() }, { merge: true }).catch(() => {});
  sendEmailVerification(cred.user).catch(() => {});
  return cred;
}

export const resetPassword = (email) => sendPasswordResetEmail(auth, email.trim());

export async function signOut() {
  clearTimeout(pushTimer);
  const s = getState();
  const u = auth.currentUser;
  if (u) await setDoc(doc(db, 'users', u.uid, 'private', 'progress'), { state: JSON.stringify(s), updatedAt: s.meta?.updatedAt || Date.now() }).catch(() => {});
  await fbSignOut(auth);
  resetAll(); // don't leave one student's progress on a shared device
}

// ---------- admin ----------
export async function listUsers(max = 500) {
  const qs = await getDocs(query(collection(db, 'users'), orderBy('lastSeenAt', 'desc'), limit(max)));
  return qs.docs.map((d) => ({ uid: d.id, ...d.data() }));
}
export async function listEvents(uid, max = 50) {
  const qs = await getDocs(query(collection(db, 'users', uid, 'events'), orderBy('at', 'desc'), limit(max)));
  return qs.docs.map((d) => ({ id: d.id, ...d.data() }));
}
export const setAccess = (uid, access) => updateDoc(doc(db, 'users', uid), { access });

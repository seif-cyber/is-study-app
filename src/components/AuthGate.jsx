import { useState } from 'react';
import { firebaseEnabled, requireAccess, contactInfo } from '../lib/firebase.js';
import { useAuth, loadCloud } from '../lib/auth.js';

function Shell({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">📚</div>
        <h1>مذاكرة IS</h1>
        <p className="muted">شرح المحاضرات والسكاشن + امتحانات ومراجعات</p>
        {children}
      </div>
    </div>
  );
}

function AuthScreen() {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setMsg('');
    const m = await loadCloud();
    try {
      if (mode === 'login') await m.signIn(email, pass);
      else if (mode === 'signup') {
        if (!name.trim()) throw { message: 'اكتب اسمك' };
        await m.signUp(name, email, pass);
      } else {
        await m.resetPassword(email);
        setMsg('✅ بعتنالك إيميل فيه لينك تغيير الباسورد');
      }
    } catch (err) {
      setMsg('❌ ' + m.authError(err));
    }
    setBusy(false);
  }

  return (
    <Shell>
      <div className="tabs auth-tabs" role="tablist">
        {[
          ['login', 'تسجيل دخول'],
          ['signup', 'حساب جديد'],
        ].map(([id, label]) => (
          <button key={id} type="button" className={mode === id ? 'on' : ''} onClick={() => (setMode(id), setMsg(''))}>
            {label}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="auth-form">
        {mode === 'signup' && (
          <label className="field">
            الاسم
            <input className="search" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </label>
        )}
        <label className="field">
          الإيميل
          <input className="search" type="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
        </label>
        {mode !== 'reset' && (
          <label className="field">
            الباسورد
            <input
              className="search"
              type="password"
              dir="ltr"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
              required
            />
          </label>
        )}
        <button className="btn primary wide" disabled={busy}>
          {busy ? '...' : mode === 'login' ? 'دخول' : mode === 'signup' ? 'إنشاء الحساب' : 'ابعت لينك تغيير الباسورد'}
        </button>
      </form>
      {msg && <p className="auth-msg">{msg}</p>}
      <button className="link" type="button" onClick={() => (setMode(mode === 'reset' ? 'login' : 'reset'), setMsg(''))}>
        {mode === 'reset' ? 'رجوع لتسجيل الدخول' : 'نسيت الباسورد؟'}
      </button>
    </Shell>
  );
}

function Pending({ email }) {
  return (
    <Shell>
      <div className="card">
        <b>⏳ حسابك اتعمل ومستني التفعيل</b>
        <p className="muted small">
          الحساب: <span dir="ltr">{email}</span>
          <br />
          أول ما يتفعّل هيفتحلك المحتوى تلقائيًا من غير ما تعمل حاجة.
        </p>
        {contactInfo && <p className="small">للتفعيل تواصل معانا: <b dir="ltr">{contactInfo}</b></p>}
      </div>
      <button className="btn wide" onClick={() => loadCloud().then((m) => m.signOut())}>
        تسجيل خروج
      </button>
    </Shell>
  );
}

export default function AuthGate({ children }) {
  const a = useAuth();
  if (!firebaseEnabled) return children;
  if (!a.ready && !a.user) return <div className="loading">⏳</div>;
  if (!a.user) return <AuthScreen />;
  if (!a.ready) return <div className="loading">⏳ بنجهز حسابك...</div>;
  if (requireAccess && !a.profile?.access && !a.isAdmin) return <Pending email={a.user.email} />;
  return children;
}

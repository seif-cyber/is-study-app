import { useEffect, useState } from 'react';
import { firebaseEnabled } from './firebase.js';

// The Firebase SDK is loaded lazily, and only when it is configured.
let promise = null;
export const loadCloud = () => (promise ||= import('./cloud.js'));

const idle = { ready: true, user: null, profile: null, isAdmin: false, disabled: true };

export function useAuth() {
  const [st, setSt] = useState(firebaseEnabled ? { ready: false } : idle);
  useEffect(() => {
    if (!firebaseEnabled) return;
    let unsub = () => {};
    loadCloud().then((m) => {
      setSt(m.getAuthState());
      unsub = m.subscribeAuth(() => setSt(m.getAuthState()));
    });
    return () => unsub();
  }, []);
  return st;
}

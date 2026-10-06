import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { login as apiLogin, logout as apiLogout } from '../data/api';

const AdminAuthContext = createContext(null);

const STORAGE_KEY = 'no3oma.admin.session';

function readSession() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(() => readSession());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  // Persist for the tab lifetime only: an admin session should not outlive the
  // browser tab, which is the safest default until the real token arrives.
  useEffect(() => {
    try {
      if (session) window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      else window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* storage may be unavailable; in-memory state still works */
    }
  }, [session]);

  const signIn = useCallback(async (email, password) => {
    setBusy(true);
    setError(null);
    try {
      const result = await apiLogin({ email, password });
      setSession(result);
      return result;
    } catch (err) {
      setError(err.code || 'invalid-credentials');
      throw err;
    } finally {
      setBusy(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await apiLogout();
    } finally {
      setSession(null);
    }
  }, []);

  const value = useMemo(
    () => ({ session, user: session?.user ?? null, token: session?.token ?? null, busy, error, signIn, signOut }),
    [session, busy, error, signIn, signOut],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
}

export default AdminAuthContext;

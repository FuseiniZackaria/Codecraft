import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

// The database is shared with another app where anyone can sign up, so a
// session alone isn't enough: the user must also be in public.admin_users.
// This check only controls what the UI shows; the real protection is the
// is_admin() row-level-security policies in supabase_security.sql.
async function checkIsAdmin() {
  const { data, error } = await supabase.rpc("is_admin");
  return !error && data === true;
}

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const sync = async (session) => {
      const ok = session ? await checkIsAdmin() : false;
      if (active) {
        setIsAdmin(ok);
        setChecking(false);
      }
    };

    supabase.auth.getSession().then(({ data }) => sync(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      // Defer so we don't call Supabase from inside its own auth callback.
      setTimeout(() => sync(s), 0);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Incorrect email or password. Please try again.");
      return false;
    }
    if (!(await checkIsAdmin())) {
      await supabase.auth.signOut();
      setError("This account doesn't have admin access.");
      return false;
    }
    setError("");
    setIsAdmin(true);
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: isAdmin, checking, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

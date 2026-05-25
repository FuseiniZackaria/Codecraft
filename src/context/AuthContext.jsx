import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const ADMIN_PASSWORD = "KINGIAN1234*";

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem("cc_admin") === "true"
  );

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("cc_admin", "true");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("cc_admin");
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

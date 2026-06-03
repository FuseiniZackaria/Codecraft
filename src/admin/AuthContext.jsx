import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("cc_admin") === "true"
  );
  const [error, setError] = useState("");

  const login = (password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("cc_admin", "true");
      setIsAuthenticated(true);
      setError("");
      return true;
    }
    setError("Incorrect password. Please try again.");
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem("cc_admin");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

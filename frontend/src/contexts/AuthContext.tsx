// src/contexts/AuthContext.tsx

"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLogged: boolean;
  setLogged: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    setIsLogged(!!auth);
  }, []);

  const setLogged = (value: boolean) => {
    setIsLogged(value);
    if (value) {
      localStorage.setItem("auth", "true");
    } else {
      localStorage.removeItem("auth");
    }
  };

  return (
    <AuthContext.Provider value={{ isLogged, setLogged }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}

"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLogged: boolean;
  email: string | null;
  setLogged: (value: boolean, email?: string) => void;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const savedEmail = localStorage.getItem("authEmail");

    setIsLogged(!!auth);
    setEmail(savedEmail || null);
    setIsAuthLoading(false);
  }, []);

  const setLogged = (value: boolean, userEmail?: string) => {
    setIsLogged(value);

    if (value && userEmail) {
      localStorage.setItem("authEmail", userEmail);
      setEmail(userEmail);
      localStorage.setItem("auth", "true");
    } else {
      localStorage.removeItem("auth");
      localStorage.removeItem("authEmail");
      setEmail(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogged, email, setLogged, isAuthLoading }}>
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

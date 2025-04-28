// src/contexts/FanProfileContext.tsx

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { FanCardProps } from "@/interfaces/fanCardProps";

interface FanProfileContextType {
  fanProfile: FanCardProps | null;
  setFanProfile: (profile: FanCardProps | null) => void;
}

const FanProfileContext = createContext<FanProfileContextType | undefined>(undefined);

export function FanProfileProvider({ children }: { children: React.ReactNode }) {
  const [fanProfile, setFanProfileState] = useState<FanCardProps | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfile = localStorage.getItem("fanProfile");
      if (storedProfile) {
        setFanProfileState(JSON.parse(storedProfile));
      }
    }
  }, []);

  const setFanProfile = (profile: FanCardProps | null) => {
    setFanProfileState(profile);
    if (profile) {
      localStorage.setItem("fanProfile", JSON.stringify(profile));
    } else {
      localStorage.removeItem("fanProfile");
    }
  };

  return (
    <FanProfileContext.Provider value={{ fanProfile, setFanProfile }}>
      {children}
    </FanProfileContext.Provider>
  );
}

export function useFanProfile() {
  const context = useContext(FanProfileContext);
  if (!context) {
    throw new Error("useFanProfile must be used inside FanProfileProvider");
  }
  return context;
}

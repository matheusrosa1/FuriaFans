"use client";
// src/contexts/FanProfileContext.tsx
import { v4 as uuidv4 } from "uuid";
import { createContext, useContext, useState, useEffect } from "react";

// Tipo do perfil

interface FanProfileContextType {
  fanProfile: FanProfile | null;
  createFanProfile: (nickname: string, email: string) => void;
  setFanProfile: (fanProfile: FanProfile | null) => void;
  login: (email: string) => void;
  logout: () => void;
}

// Criar o contexto
const FanProfileContext = createContext<FanProfileContextType | undefined>(undefined);

// Provider
export function FanProfileProvider({ children }: { children: React.ReactNode }) {
  const [fanProfile, setFanProfile] = useState<FanProfile | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("currentFanProfile");
    if (savedProfile) {
      setFanProfile(JSON.parse(savedProfile));
    }
  }, []);

  const createFanProfile = (nickname: string, email: string) => {
    const newFanProfile: FanProfile = {
      id: uuidv4(),
      nickname,
      email,
    };

    const existingFans = JSON.parse(localStorage.getItem('fans') || '[]');
    existingFans.push(newFanProfile);
    localStorage.setItem('fans', JSON.stringify(existingFans));

    setFanProfile(newFanProfile);
    localStorage.setItem('currentFanProfile', JSON.stringify(newFanProfile));
  };

   const login = (email: string) => {
    const fans = JSON.parse(localStorage.getItem('fans') || '[]');
    const foundFan = fans.find((fan: any) => fan.email?.toLowerCase() === email.toLowerCase()); // comparação segura
    
    if (foundFan) {
      const fanProfile: FanProfile = {
        id: foundFan.id,
        nickname: foundFan.nickname,
        email: foundFan.email,
      };
      setFanProfile(fanProfile);
      localStorage.setItem('currentFanProfile', JSON.stringify(fanProfile));
    } else {
      console.warn("Nenhum FanProfile encontrado para este e-mail. Você será redirecionado para criar perfil.");
      setFanProfile(null);
      localStorage.removeItem('currentFanProfile');
    }
  };
  

/*   const login = () => {
    const authId = localStorage.getItem('authId');
  
    if (!authId) {
      console.error("Nenhum authId encontrado");
      setFanProfile(null);
      localStorage.removeItem('currentFanProfile');
      return;
    }
  
    const fans = JSON.parse(localStorage.getItem('fans') || '[]');
    const foundFan = fans.find((fan: any) => fan.id === authId);
  
    if (foundFan) {
      const fanProfile: FanProfile = {
        id: foundFan.id,
        nickname: foundFan.nickname,
        email: foundFan.email,
      };
      setFanProfile(fanProfile);
      localStorage.setItem('currentFanProfile', JSON.stringify(fanProfile));
    } else {
      console.error("FanProfile não encontrado para o authId.");
      setFanProfile(null);
      localStorage.removeItem('currentFanProfile');
    }
  };
   */
  

  const logout = () => {
    setFanProfile(null);
    localStorage.removeItem('currentFanProfile');
  };

  return (
    <FanProfileContext.Provider value={{ fanProfile, createFanProfile, login, logout, setFanProfile }}>
      {children}
    </FanProfileContext.Provider>
  );
}

// Hook para usar o contexto
export function useFanProfile() {
  const context = useContext(FanProfileContext);
  if (!context) {
    throw new Error('useFanProfile deve ser usado dentro de FanProfileProvider');
  }
  return context;
}
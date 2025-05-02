"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { FanProfile } from "@/interfaces/FanProfile";
import { FanProfileContextType } from "@/interfaces/FanProfileContextType";

const FanProfileContext = createContext<FanProfileContextType | undefined>(undefined);

export function FanProfileProvider({ children }: { children: React.ReactNode }) {
  const [fanProfile, setFanProfile] = useState<FanProfile | null>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("currentFanProfile");
    if (savedProfile) {
      setFanProfile(JSON.parse(savedProfile));
    }
  }, []);

  const createFanProfile = (
    nickname: string,
    email: string,
    favoriteGame: string,
    fanLevel: 'casual' | 'engaged' | 'hardcore',
    photoUrl: string = "",
    photoFile: File | null = null
  ) => {
    const authId = localStorage.getItem('authId');
    if (!authId) {
      console.error("Erro: authId não encontrado no localStorage.");
      return;
    }
    const newFanProfile: FanProfile = {
      id: authId,
      nickname,
      email,
      favoriteGame,
      fanLevel,
      photoUrl,
      photoFile,
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
        favoriteGame: foundFan.favoriteGame,
        fanLevel: foundFan.fanLevel,
        photoUrl: foundFan.photoUrl || "",
        photoFile: foundFan.photoFile || null,
      };
      setFanProfile(fanProfile);
      localStorage.setItem('currentFanProfile', JSON.stringify(fanProfile));
    } else {
      console.warn("Nenhum FanProfile encontrado para este e-mail. Você será redirecionado para criar perfil.");
      setFanProfile(null);
      localStorage.removeItem('currentFanProfile');
    }
  };
  

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
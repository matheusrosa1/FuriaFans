"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { FanRecord } from "@/interfaces/FanRecord";
import { mockFans } from "@/mocks/FansMock";
import { FanContextType } from "@/interfaces/FanContextType";
import { useFanProfile } from "./FanProfileContext";


const FanContext = createContext<FanContextType | undefined>(undefined);

export function FanProvider({ children }: { children: React.ReactNode }) {
  const [fans, setFans] = useState<FanRecord[]>([]);
  const { fanProfile } = useFanProfile();


  useEffect(() => {
    const storedFans = localStorage.getItem("fans");
    if (storedFans) {
      setFans(JSON.parse(storedFans));
    } else {
      setFans(mockFans);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fans", JSON.stringify(fans));
  }, [fans]);

  const updateFan = (id: string, updatedFan: Partial<FanRecord>) => {
    setFans(prevFans =>
      prevFans.map(fan => (fan.id === id ? { ...fan, ...updatedFan } : fan))
    );
  };

  const addFan = (newFan: FanRecord) => {
    setFans(prevFans => [...prevFans, newFan]);
  };

  function toggleFavorite(fanId: string) {
    if (!fanProfile) return;
  
    setFans(prevFans =>
      prevFans.map(fan => {
        if (fan.id === fanId) {
          const isAlreadyFavorited = fan.favoritedByIds?.includes(fanProfile.id);
  
          let updatedFavoritedByIds: string[];
          if (isAlreadyFavorited) {
            updatedFavoritedByIds = fan.favoritedByIds?.filter(id => id !== fanProfile.id) || [];
          } else {
            updatedFavoritedByIds = [...(fan.favoritedByIds || []), fanProfile.id];
          }
  
          return { ...fan, favoritedByIds: updatedFavoritedByIds };
        }
        return fan;
      })
    );
  }
  
  

  return (
    <FanContext.Provider value={{ fans, updateFan, addFan, toggleFavorite }}>
      {children}
    </FanContext.Provider>
  );
}

export function useFanContext() {
  const context = useContext(FanContext);
  if (!context) {
    throw new Error("useFanContext must be used within a FanProvider");
  }
  return context;
}

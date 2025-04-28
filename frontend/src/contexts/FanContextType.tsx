"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Fan } from "@/interfaces/fan";
import { mockFans } from "@/mocks/FansMock";


interface FanContextType {
  fans: Fan[];
  updateFan: (id: string, updatedFan: Partial<Fan>) => void;
  addFan: (newFan: Fan) => void;
}

const FanContext = createContext<FanContextType | undefined>(undefined);

export function FanProvider({ children }: { children: React.ReactNode }) {
  const [fans, setFans] = useState<Fan[]>([]);

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

  const updateFan = (id: string, updatedFan: Partial<Fan>) => {
    setFans(prevFans =>
      prevFans.map(fan => (fan.id === id ? { ...fan, ...updatedFan } : fan))
    );
  };

  const addFan = (newFan: Fan) => {
    setFans(prevFans => [...prevFans, newFan]);
  };

  return (
    <FanContext.Provider value={{ fans, updateFan, addFan }}>
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

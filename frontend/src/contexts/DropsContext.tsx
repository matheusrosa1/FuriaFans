// src/contexts/DropsContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DropMessage } from "@/interfaces/dropMessage";

interface DropsContextType {
  messages: DropMessage[];
  addMessage: (message: DropMessage) => void;
  toggleLike: (messageId: string, userId: string) => void;
}

const DropsContext = createContext<DropsContextType | undefined>(undefined);

export const DropsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<DropMessage[]>([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem("dropsMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      setMessages([
        {
          id: crypto.randomUUID(),
          author: "Bia Rush",
          content: "FURIA rumo ao topo! 💜",
          timestamp: new Date().toLocaleTimeString(),
          likedBy: [],
        },
        {
          id: crypto.randomUUID(),
          author: "Lucas Matador",
          content: "A torcida mais insana do CS está aqui!",
          timestamp: new Date().toLocaleTimeString(),
          likedBy: [],
        },
      ]);
    }
  }, []);

  const addMessage = (message: DropMessage) => {
    const updatedMessages = [message, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem("dropsMessages", JSON.stringify(updatedMessages));
  };

  const toggleLike = (messageId: string, userId: string) => {
    const updatedMessages = messages.map((msg) => {
      if (msg.id === messageId) {
        const likedBy = msg.likedBy.includes(userId)
          ? msg.likedBy.filter((id) => id !== userId)
          : [...msg.likedBy, userId];
        return { ...msg, likedBy };
      }
      return msg;
    });
    setMessages(updatedMessages);
    localStorage.setItem("dropsMessages", JSON.stringify(updatedMessages));
  };

  return (
    <DropsContext.Provider value={{ messages, addMessage, toggleLike }}>
      {children}
    </DropsContext.Provider>
  );
};

export const useDrops = () => {
  const context = useContext(DropsContext);
  if (!context) {
    throw new Error("useDrops must be used within a DropsProvider");
  }
  return context;
};

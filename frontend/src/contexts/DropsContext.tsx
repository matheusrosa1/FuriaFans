"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DropMessage } from "@/interfaces/dropMessage";
import { useFanProfile } from "@/contexts/FanProfileContext";

interface DropsContextType {
  messages: DropMessage[];
  addMessage: (message: { content: string }) => void;
  toggleLike: (messageId: string, userId: string) => void;
  editMessage: (messageId: string, newContent: string) => void;
  deleteMessage: (messageId: string) => void;
}

const DropsContext = createContext<DropsContextType | undefined>(undefined);

export const DropsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<DropMessage[]>([]);
  const { fanProfile } = useFanProfile();

  useEffect(() => {
    const stored = localStorage.getItem("dropsMessages");

    if (stored) {
      const parsed = JSON.parse(stored);
      const safeMessages = parsed.map((msg: any) => ({
        ...msg,
        likedBy: Array.isArray(msg.likedBy) ? msg.likedBy : [],
        fanId: msg.fanId || "",
      }));
      setMessages(safeMessages);
    } else {
      setMessages([
        {
          id: crypto.randomUUID(),
          author: "Bia Rush",
          fanId: "51ea6888-68d7-49a3-a2e3-e9679abd21b6",
          content: "FURIA rumo ao topo! 💜",
          timestamp: new Date().toLocaleTimeString(),
          likedBy: [],
        },
        {
          id: crypto.randomUUID(),
          author: "Lucas Killer",
          fanId: "a5894e6a-c94e-4d5f-9e98-97011523d35b",
          content: "A torcida mais insana do CS está aqui!",
          timestamp: new Date().toLocaleTimeString(),
          likedBy: [],
        },
      ]);
    }
  }, []);

  const persist = (updatedMessages: DropMessage[]) => {
    setMessages(updatedMessages);
    localStorage.setItem("dropsMessages", JSON.stringify(updatedMessages));
  };

  const addMessage = ({ content }: { content: string }) => {
    if (!fanProfile) return;

    const newMessage: DropMessage = {
      id: crypto.randomUUID(),
      author: fanProfile.nickname,
      fanId: fanProfile.id,
      content,
      timestamp: new Date().toLocaleTimeString(),
      likedBy: [],
    };

    const updated = [newMessage, ...messages];
    persist(updated);
  };

  const toggleLike = (messageId: string, userId: string) => {
    const updated = messages.map((msg) => {
      if (msg.id === messageId) {
        const likedBy = msg.likedBy.includes(userId)
          ? msg.likedBy.filter((id) => id !== userId)
          : [...msg.likedBy, userId];
        return { ...msg, likedBy };
      }
      return msg;
    });

    persist(updated);
  };

  const editMessage = (messageId: string, newContent: string) => {
    if (!fanProfile) return;

    const updated = messages.map((msg) =>
      msg.id === messageId && msg.fanId === fanProfile.id
        ? { ...msg, content: newContent }
        : msg
    );

    persist(updated);
  };

  const deleteMessage = (messageId: string) => {
    if (!fanProfile) return;

    const updated = messages.filter(
      (msg) => !(msg.id === messageId && msg.fanId === fanProfile.id)
    );

    persist(updated);
  };

  return (
    <DropsContext.Provider value={{ messages, addMessage, toggleLike, editMessage, deleteMessage }}>
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

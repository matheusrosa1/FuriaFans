"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useFanProfile } from "@/contexts/FanProfileContext";
import { FaPaperPlane } from "react-icons/fa";
import { useDrops } from "@/contexts/DropsContext";
import { DropMessage } from "@/interfaces/dropMessage";
import { GrLike } from "react-icons/gr";

export default function DropsPage() {
  const router = useRouter();
  const { isLogged } = useAuth();
  const { fanProfile  } = useFanProfile();
  const { messages, addMessage, toggleLike } = useDrops(); // 👈 vindo do contexto
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: DropMessage = {
      id: crypto.randomUUID(),
      author: fanProfile?.nickname || "Anônimo",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
      likedBy: [],
    };

    addMessage(newMessage); // 👈 usando a função do contexto
    setInput("");
  };
  

  return (
    <main className="p-6 bg-gray-100 min-h-screen bg-[url(/Torcida-FURIA-IEM-Rio-Major-2022.jpg)]">
      <Navbar />

      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center items-center mb-8 mt-4">
          <h1 className="text-3xl font-bold text-white">Drops</h1>
        </div>

        <div className="mb-6 flex gap-2 items-start">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border rounded-lg p-4 text-sm resize-none min-h-[80px] bg-white"
            placeholder="Compartilhe momentos, grite sua torcida!"
            disabled={!isLogged || !fanProfile}
          />
          <button
            onClick={handleSend}
            disabled={!isLogged || !fanProfile || !input.trim()}
            className={`text-purple-600 hover:text-purple-800 transition-transform hover:translate-x-1 active:scale-95 mt-7 ${
              (!isLogged || !fanProfile || !input.trim()) && "opacity-50 cursor-not-allowed"
            }`}
            aria-label="Enviar mensagem"
          >
            <FaPaperPlane size={30} />
          </button>
        </div>


        {(!isLogged || (isLogged && !fanProfile)) && (
          <div className="mt-2 text-sm text-red-500">
            {!isLogged && <p>Você precisa estar logado para enviar mensagens.</p>}
            {isLogged && !fanProfile && (
              <p>Você precisa criar um perfil de fã para enviar mensagens.</p>
            )}
          </div>
        )}

        <ul className="space-y-4 mt-6">
          {messages.map((msg) => {
          const hasLiked = fanProfile && Array.isArray(msg.likedBy) && msg.likedBy.includes(fanProfile.id);
          return (
            <li key={msg.id} className="bg-white rounded-lg p-4 shadow">
            <div className="flex justify-between items-center mb-1">
            <span className="font-semibold">{msg.author}</span>
            <span className="text-xs text-gray-400">{msg.timestamp}</span>
            </div>
          <p className="text-gray-800 text-sm mb-2">{msg.content}</p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fanProfile && toggleLike(msg.id, fanProfile.id)}
            disabled={!isLogged || !fanProfile}
            className={`flex items-center gap-1 text-sm font-medium transition ${
              hasLiked ? "text-purple-600" : "text-gray-500"
            } hover:text-purple-700`}
            aria-label="Curtir mensagem"
          >
            <GrLike className="text-lg" />
            <span>{Array.isArray(msg.likedBy) ? msg.likedBy.length : 0}</span>
          </button>
        </div>
      </li>
    );
  })}
</ul>

      </div>
    </main>
  );
}

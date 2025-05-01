"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useFanProfile } from "@/contexts/FanProfileContext";
import { FaPaperPlane } from "react-icons/fa";
import { useDrops } from "@/contexts/DropsContext";
import DropList from "@/components/DropList";

export default function DropsPage() {
  const { isLogged } = useAuth();
  const { fanProfile } = useFanProfile();
  const { addMessage } = useDrops();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || !fanProfile) return;
    addMessage({ content: input.trim() }); // ✅ mais simples agora
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

        {(!isLogged || !fanProfile) && (
          <div className="mt-2 text-sm text-red-500">
            {!isLogged && <p>Você precisa estar logado para enviar mensagens.</p>}
            {isLogged && !fanProfile && (
              <p>Você precisa criar um perfil de fã para enviar mensagens.</p>
            )}
          </div>
        )}

        <DropList />
      </div>
    </main>
  );
}

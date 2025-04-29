"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DropMessage } from "../../interfaces/dropMessage";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useFanProfile } from "@/contexts/FanProfileContext";
import { FaPaperPlane } from "react-icons/fa";
import { Button } from "@/components/Button";

export default function DropsPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<DropMessage[]>([]);
  const [input, setInput] = useState("");
  const { isLogged } = useAuth();
  const { fanProfile } = useFanProfile();

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
        },
        {
          id: crypto.randomUUID(),
          author: "Lucas Matador",
          content: "A torcida mais insana do CS está aqui!",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    const profile = JSON.parse(localStorage.getItem("fanProfile") || "{}");

    const newMessage: DropMessage = {
      id: crypto.randomUUID(),
      author: profile.nickname || auth.email || "Anônimo",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedMessages = [newMessage, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem("dropsMessages", JSON.stringify(updatedMessages));
    setInput("");
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen bg-[url(/Torcida-FURIA-IEM-Rio-Major-2022.jpg)]">
      <Navbar />

      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center items-center mb-8 mt-4">
          <h1 className="text-3xl font-bold text-white">Drops</h1>
        </div>

{/*         <p className="text-gray-600 mb-6 text-center text-white">
          Compartilhe momentos, grite sua torcida!
        </p> */}

        {/* Textarea + botão na mesma linha */}
        <div className="mb-6 flex gap-2 items-start">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border rounded-lg p-4 text-sm resize-none min-h-[80px] bg-white"
            placeholder="Compartilhe momentos, grite sua torcida!"
            disabled={!isLogged || !fanProfile}
      
          />
/*         <Button
          label="Enviar"
          onClick={handleSend}
          icon={<FaPaperPlane className="transition-transform hover:translate-x-1 mv-5" />}
          disabled={!isLogged || !fanProfile || !input.trim()}
          fullWidth={false}
        /> 

{/*           <button
            onClick={handleSend}
            disabled={!isLogged || !fanProfile || !input.trim()}
            className={`px-4 py-2 rounded text-white text-sm font-medium transition whitespace-nowrap h-[80px] flex items-center gap-2 ${
              isLogged && fanProfile
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            <FaPaperPlane className="transition-transform hover:translate-x-1" />
          </button> */}
{/*            <button
              onClick={handleSend}
              disabled={!isLogged || !fanProfile || !input.trim()}
              className={`text-purple-600 hover:text-purple-800 transition-transform hover:translate-x-1 active:scale-95 mt-7 ${
              (!isLogged || !fanProfile || !input.trim()) && "opacity-50 cursor-not-allowed"
              }`}
              aria-label="Enviar mensagem">
            <FaPaperPlane size={30} />
          </button> */}
        </div>

        {/* Mensagens de validação */}
        {(!isLogged || (isLogged && !fanProfile)) && (
          <div className="mt-2 text-sm text-red-500">
            {!isLogged && <p>Você precisa estar logado para enviar mensagens.</p>}
            {isLogged && !fanProfile && (
              <p>Você precisa criar um perfil de fã para enviar mensagens.</p>
            )}
          </div>
        )}

        {/* Lista de mensagens */}
        <ul className="space-y-4 mt-6">
          {messages.map((msg) => (
            <li key={msg.id} className="bg-white rounded-lg p-4 shadow">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">{msg.author}</span>
                <span className="text-xs text-gray-400">{msg.timestamp}</span>
              </div>
              <p className="text-gray-800 text-sm">{msg.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

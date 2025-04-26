// Página de criação de perfil de fã (/add-fan)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddFanPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [favoriteGame, setFavoriteGame] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [fanLevel, setFanLevel] = useState("casual");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fanProfile = {
      name,
      favoriteGame,
      photoUrl,
      fanLevel,
    };

    localStorage.setItem("fanProfile", JSON.stringify(fanProfile));
    console.log("Perfil de fã salvo:", fanProfile);

    router.push("/fan/me");
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Perfil de Fã</h1>

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">Nome:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">Jogo favorito:</span>
          <input
            type="text"
            value={favoriteGame}
            onChange={(e) => setFavoriteGame(e.target.value)}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">URL da foto (opcional):</span>
          <input
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://exemplo.com/foto.jpg"
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block mb-6">
          <span className="block text-sm font-medium text-gray-700">Nível de fã:</span>
          <select
            value={fanLevel}
            onChange={(e) => setFanLevel(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
          >
            <option value="casual">Casual</option>
            <option value="engaged">Engajado</option>
            <option value="hardcore">Hardcore</option>
          </select>
        </label>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Cadastrar Fã
        </button>
      </form>
    </main>
  );
}

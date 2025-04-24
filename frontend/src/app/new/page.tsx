"use client";
import { useState } from "react";

export default function NewFanPage() {
  const [name, setName] = useState("");
  const [favoriteGame, setFavoriteGame] = useState("");
  const [fanLevel, setFanLevel] = useState("casual");
  const [photoUrl, setPhotoUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFan = { name, favoriteGame, fanLevel, photoUrl };
    console.log("Novo fã cadastrado:", newFan);
    // Aqui futuramente você envia para API
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Cadastrar novo fã</h1>
      <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded-lg shadow">
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">Nome:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">Jogo favorito:</span>
          <input
            type="text"
            value={favoriteGame}
            onChange={(e) => setFavoriteGame(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">URL da foto (opcional):</span>
          <input
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
            placeholder="https://exemplo.com/foto.jpg"
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
          Cadastrar fã
        </button>
      </form>
    </main>
  );
}
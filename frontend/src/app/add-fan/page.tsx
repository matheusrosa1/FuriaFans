"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FanProfile } from "../../interfaces/fanProfile";

export default function AddFanPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [favoriteGame, setFavoriteGame] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [fanLevel, setFanLevel] = useState<FanProfile["fanLevel"]>("casual");

  useEffect(() => {
    const fanProfile = localStorage.getItem("fanProfile");
    if (fanProfile) {
      router.push("/fan/me");
    }
  }, [router]);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let base64Photo = "";
  
    if (photoFile) {
      base64Photo = await convertToBase64(photoFile);
    }
  
    const fanProfile: FanProfile = {
      nickname,
      favoriteGame,
      photoUrl: base64Photo,
      fanLevel,
    };
  
    localStorage.setItem("fanProfile", JSON.stringify(fanProfile));
  
    const fansMocked = JSON.parse(localStorage.getItem("fansMocked") || "[]");
    fansMocked.push(fanProfile);
    localStorage.setItem("fansMocked", JSON.stringify(fansMocked));
  
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
          <span className="block text-sm font-medium text-gray-700">Nickname:</span>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
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
          <span className="block text-sm font-medium text-gray-700">Foto (opcional):</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setPhotoFile(e.target.files[0]);
              } else {
                setPhotoFile(null);
              }
            }}
            className="mt-1 block w-full border rounded px-3 py-2"  
          />
        </label>

        <label className="block mb-6">
          <span className="block text-sm font-medium text-gray-700">Nível de fã:</span>
          <select
            value={fanLevel}
            onChange={(e) => setFanLevel(e.target.value as FanProfile["fanLevel"])}
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

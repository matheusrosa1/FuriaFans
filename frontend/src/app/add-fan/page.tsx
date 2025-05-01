"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { Fan } from "@/interfaces/fan";
import { useFanProfile } from "@/contexts/FanProfileContext";
import { useFanContext } from "@/contexts/FanContextType";
import { useAuth } from "@/contexts/AuthContext";
import EditProfilePhoto from "@/components/EditProfilePhoto";
import { gameList } from "@/mocks/gameList";

export default function AddFanPage() {
  const router = useRouter();
  const { addFan } = useFanContext();
  const { fanProfile, setFanProfile } = useFanProfile();
  const { setLogged } = useAuth();

  const [nickname, setNickname] = useState("");
  const [favoriteGame, setFavoriteGame] = useState("");
  const [customGame, setCustomGame] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [fanLevel, setFanLevel] = useState<Fan["fanLevel"]>("casual");

  useEffect(() => {
    if (localStorage.getItem("fanProfile")) {
      router.push("/fan/me");
    }
  }, [fanProfile, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalGame = favoriteGame === "Outro" ? customGame : favoriteGame;

    const newFan: Fan = {
      id: uuidv4(),
      nickname,
      favoriteGame: finalGame,
      fanLevel,
      photoUrl: photoUrl || "",
      photoFile: null,
    };

    setFanProfile(newFan);
    addFan(newFan);
    setLogged(true);
    router.push("/fan/me");
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex items-center justify-center bg-[url(/Torcida-FURIA-IEM-Rio-Major-2022.jpg)]">
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
          <select
            value={favoriteGame}
            onChange={(e) => setFavoriteGame(e.target.value)}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          >
            <option value="">Selecione um jogo</option>
            {gameList.map((game) => (
              <option key={game} value={game}>
                {game === "Outro" ? "Outro (escreva)" : game}
              </option>
            ))}
          </select>

          {favoriteGame === "Outro" && (
            <input
              type="text"
              placeholder="Digite o nome do jogo"
              value={customGame}
              onChange={(e) => setCustomGame(e.target.value)}
              className="mt-2 block w-full border rounded px-3 py-2"
              required
            />
          )}
        </label>

        {/* Imagem com recorte */}
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Foto (opcional):</span>

          {photoUrl && (
            <div className="flex justify-center my-3">
              <img
                src={photoUrl}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border"
              />
            </div>
          )}

          {!showCropper && (
            <button
              type="button"
              onClick={() => setShowCropper(true)}
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Selecionar Foto
            </button>
          )}

          {showCropper && (
            <EditProfilePhoto
              onSave={(croppedImg) => {
                setPhotoUrl(croppedImg);
                setShowCropper(false);
              }}
              onCancel={() => setShowCropper(false)}
            />
          )}
        </div>

        <label className="block mb-6">
          <span className="block text-sm font-medium text-gray-700">Nível de fã:</span>
          <select
            value={fanLevel}
            onChange={(e) => setFanLevel(e.target.value as Fan["fanLevel"])}
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

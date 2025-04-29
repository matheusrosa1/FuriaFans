"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Ícones de coração
import { useFanContext } from "@/contexts/FanContextType";

export default function FanIdPage() {
  const { id } = useParams(); // Pegando o id da URL
  const { fans, updateFan } = useFanContext();
  const router = useRouter();

  const fan = fans.find((fan) => fan.id === id);

  if (!fan) {
    return (
      <main className="p-6 min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-gray-600">Fã não encontrado.</p>
      </main>
    );
  }

  const handleFavoriteClick = () => {
    updateFan(fan.id, { isFavorite: !fan.isFavorite });
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center bg-[url(/Torcida-FURIA-IEM-Rio-Major-2022.jpg)]">
      <div className="flex justify-end w-full max-w-2xl mb-6 gap-4">
        <Button label="Home" onClick={() => router.push("/")} />
        <Button label="Drops" onClick={() => router.push("/drops")} />
      </div>

      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow flex flex-col items-center relative">
        <h1 className="text-2xl font-bold mb-6 text-center">Perfil do Fã</h1>

     <button
        onClick={handleFavoriteClick}
        className={`absolute top-2 right-2 transition-colors ${
          fan.isFavorite ? "text-purple-600" : "text-black"
        } hover:text-purple-700`}
      >
        {fan.isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
      </button>

        {fan.photoUrl && (
          <img
            src={fan.photoUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border mb-4"
          />
        )}

        <ul className="text-sm text-gray-800 w-full max-w-sm mt-6">
          <li className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <strong>Nick Name:</strong> {fan.nickname}
          </li>
          <li className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <strong>Jogo Favorito:</strong> {fan.favoriteGame}
          </li>
          <li className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <strong>Nível de Fã:</strong> {fan.fanLevel}
          </li>
        </ul>
      </div>
    </main>
  );
}

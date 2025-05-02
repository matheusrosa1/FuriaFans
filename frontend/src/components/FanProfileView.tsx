"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useFanContext } from "@/contexts/FanListContext";
import { useFanProfile } from "@/contexts/FanProfileContext";
import { Fan } from "@/interfaces/fan";
import { FanProfileViewProps } from "@/interfaces/FanProfileViewProps";
import { FaHeart, FaRegHeart } from "react-icons/fa";




export default function FanProfileView({ fan, showFavoriteButton = false }: FanProfileViewProps) {
  const { updateFan } = useFanContext();
  const { fanProfile } = useFanProfile()
  const { toggleFavorite } = useFanContext(); 
  const { isLogged } = useAuth();

  const isFavorited = fan.favoritedByIds?.includes(fanProfile?.id || "");


  function handleFavoriteClick() {
    if (!isLogged || !fanProfile) {
      console.warn("Você precisa estar logado para favoritar!");
      return;
    }
    toggleFavorite(fan.id);
  }
  

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow flex flex-col items-center relative">
      <h1 className="text-2xl font-bold mb-6 text-center">{fan.nickname}</h1>

      {showFavoriteButton && fanProfile?.id !== fan.id && (
      <button
        onClick={handleFavoriteClick}
        disabled={!isLogged || !fanProfile}
        title={
          !isLogged || !fanProfile
          ? "Você precisa estar logado para favoritar"
          : "Favoritar"
        }
        className={`absolute top-2 right-2 transition-colors ${
        isFavorited ? "text-purple-600" : "text-black"
        } hover:text-purple-700 ${
        !isLogged || !fanProfile ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isFavorited ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
      </button>
 
)}


      {fan.photoUrl && (
        <img
          src={fan.photoUrl}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border mb-4"
        />
      )}

      <ul className="text-sm text-gray-800 w-full max-w-sm mt-6">
{/*         <li className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <strong>Nick Name:</strong> 
        </li> */}
        <li className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <strong>Jogo Favorito:</strong> {fan.favoriteGame}
        </li>
        <li className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <strong>Nível de Fã:</strong> {fan.fanLevel}
        </li>
      </ul>
    </div>
  );
}
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Fan } from "@/interfaces/fan";

import { FaHeart, FaRegHeart } from "react-icons/fa"; // Agora só importamos o coração
import { useFanContext } from "@/contexts/FanContextType";
import { useFanProfile } from "@/contexts/FanProfileContext";
import { useAuth } from "@/contexts/AuthContext";

const FanCard: React.FC<Fan> = ({ id, nickname, favoriteGame, fanLevel, photoUrl, isFavorite }) => {
  const router = useRouter();
  const { fanProfile } = useFanProfile();
  const { isLogged } = useAuth();
  const { updateFan } = useFanContext();

  const handleClick = () => {
    router.push(`/fan/${id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateFan(id, { isFavorite: !isFavorite });
  };

  return (
    <div
      onClick={handleClick}
      className="relative border rounded-xl p-4 shadow bg-white/30 backdrop-blur-md w-[250px] flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-purple-700/70 hover:-translate-y-1 cursor-pointer"
    >

    <button
      onClick={(e) => {
        if (!isLogged || !fanProfile) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      handleFavoriteClick(e);
      }}
      disabled={!isLogged || !fanProfile}
      title={!isLogged || !fanProfile ? "Você deve estar logado e ser um fã para favoritar" : "Favoritar"}
      className={`absolute top-2 right-2 transition-colors ${
      isFavorite ? "text-purple-600" : "text-black"
      } hover:text-purple-700 ${
      (!isLogged || !fanProfile) ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
    </button>


      {photoUrl && (
        <img
          src={photoUrl}
          alt={`Foto de ${nickname}`}
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
      )}
      <h2 className="text-xl font-bold text-center">{nickname}</h2>
      <p className="text-gray-700">🎮 {favoriteGame}</p>
      <p className="text-sm mt-2">
        Nível de Fã: <span className="font-semibold">{fanLevel}</span>
      </p>
    </div>
  );
};

export default FanCard;
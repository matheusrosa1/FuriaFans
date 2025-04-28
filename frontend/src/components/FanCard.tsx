"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Fan } from "@/interfaces/fan";

const FanCard: React.FC<Fan> = ({ id, nickname, favoriteGame, fanLevel, photoUrl }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/fan/${id}`); // 👈 Navega para a página do fã clicado
  };

  return (
    <div
      onClick={handleClick}
      className="border rounded-xl p-4 shadow bg-white/30 backdrop-blur-md w-[250px] flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-purple-700/70 hover:-translate-y-1 cursor-pointer"
    >
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

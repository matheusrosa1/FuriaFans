import React from 'react';
import { Fan } from '@/interfaces/fan';

const FanCard: React.FC<Fan> = ({ nickname, favoriteGame, fanLevel, photoUrl }) => {
  return (
    // <div className="border rounded-xl p-4 shadow bg-white/60 w-full max-w-[300px] flex flex-col items-center">
    <div className="border rounded-xl p-4 shadow bg-white/30 backdrop-blur-md w-[250px] flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-purple-700/70 hover:-translate-y-1">
      {photoUrl && (
        <img
          src={photoUrl}
          alt={`Foto de ${nickname}`}
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
      )}
      <h2 className="text-xl font-bold text-center">{nickname}</h2>
      <p className="text-gray-700">🎮 {favoriteGame}</p>
      <p className="text-sm mt-2">Nível de Fã: <span className="font-semibold">{fanLevel}</span></p>
    </div>
  );
};

export default FanCard;
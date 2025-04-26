import React from 'react';
import { FanCardProps } from '../interfaces/fanCardProps';

const FanCard: React.FC<FanCardProps> = ({ name, favoriteGame, fanLevel, photoUrl }) => {
  return (
    <div className="border rounded-xl p-4 shadow bg-white w-full max-w-[300px] flex flex-col items-center">
      {photoUrl && (
        <img
          src={photoUrl}
          alt={`Foto de ${name}`}
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
      )}
      <h2 className="text-xl font-bold text-center">{name}</h2>
      <p className="text-gray-700">🎮 {favoriteGame}</p>
      <p className="text-sm mt-2">Nível de Fã: <span className="font-semibold">{fanLevel}</span></p>
    </div>
  );
};

export default FanCard;
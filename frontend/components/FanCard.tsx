import React from 'react';

export interface FanCardProps {
  name: string;
  favoriteGame: string;
  fanLevel: 'casual' | 'engaged' | 'hardcore';
}

const FanCard: React.FC<FanCardProps> = ({ name, favoriteGame, fanLevel }) => {
  return (
    <div className="border rounded-xl p-4 shadow bg-white w-full max-w-sm">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-700">🎮 {favoriteGame}</p>
      <p className="text-sm mt-2">Nível de Fã: <span className="font-semibold">{fanLevel}</span></p>
    </div>
  );
};

export default FanCard;
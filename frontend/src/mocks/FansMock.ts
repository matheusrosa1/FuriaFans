// src/mocks/fans.ts

import { Fan } from "@/interfaces/fan";

import { v4 as uuidv4 } from "uuid";


export const mockFans: Fan[] = [
  {
    id: "a5894e6a-c94e-4d5f-9e98-97011523d35b",
    nickname: "Lucas Killer",
    favoriteGame: "CS:GO",
    fanLevel: "hardcore",
    photoUrl: "https://ui-avatars.com/api/?name=Lucas+Matador&background=random",
  },
  {
    id: "51ea6888-68d7-49a3-a2e3-e9679abd21b6",
    nickname: "Bia Rush",
    favoriteGame: "Valorant",
    fanLevel: "engaged",
    photoUrl: "https://ui-avatars.com/api/?name=Bia+Rush&background=random",
  },
  {
    id: uuidv4(),
    nickname: "João Chill",
    favoriteGame: "League of Legends",
    fanLevel: "casual",
    photoUrl: "https://ui-avatars.com/api/?name=Joao+Chill&background=random",
  },
  {
    id: uuidv4(),
    nickname: "Ana Pro",
    favoriteGame: "Dota 2",
    fanLevel: "hardcore",
    photoUrl: "https://ui-avatars.com/api/?name=Ana+Pro&background=random",
  },
  {
    id: uuidv4(),
    nickname: "Carlos Sniper",
    favoriteGame: "Apex Legends",
    fanLevel: "engaged",
    photoUrl: "https://ui-avatars.com/api/?name=Carlos+Sniper&background=random",
  },
  {
    id: uuidv4(),
    nickname: "Fernanda Gamer",
    favoriteGame: "Fortnite",
    fanLevel: "casual",
    photoUrl: "https://ui-avatars.com/api/?name=Fernanda+Gamer&background=random",
  },
  {
    id: uuidv4(),
    nickname: "Ricardo Speed",
    favoriteGame: "Overwatch",
    fanLevel: "hardcore",
    photoUrl: "https://ui-avatars.com/api/?name=Ricardo+Speed&background=random",
  },
  {
    id: "8",
    nickname: "Mariana Ninja",
    favoriteGame: "Call of Duty",
    fanLevel: "engaged",
    photoUrl: "https://ui-avatars.com/api/?name=Mariana+Ninja&background=random",
  },
  {
    id: uuidv4(),
    nickname: "Felipe Master",
    favoriteGame: "PUBG",
    fanLevel: "casual",
    photoUrl: "https://ui-avatars.com/api/?name=Felipe+Master&background=random",
  },
  {
    id: uuidv4(),
    nickname: "Juliana Pro",
    favoriteGame: "Rainbow Six Siege",
    fanLevel: "hardcore",
    photoUrl: "https://ui-avatars.com/api/?name=Juliana+Pro&background=random",
  }
];

"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FanCard, { FanCardProps } from "../../components/FanCard";

const mockFans: FanCardProps[] = [
  {
    name: "Lucas Matador",
    favoriteGame: "CS:GO",
    fanLevel: "hardcore",
    photoUrl: "https://ui-avatars.com/api/?name=Lucas+Matador&background=random"
  },
  {
    name: "Bia Rush",
    favoriteGame: "Valorant",
    fanLevel: "engaged",
    photoUrl: "https://ui-avatars.com/api/?name=Bia+Rush&background=random"
  },
  {
    name: "João Chill",
    favoriteGame: "League of Legends",
    fanLevel: "casual",
    photoUrl: "https://ui-avatars.com/api/?name=Joao+Chill&background=random"
  },
];

export default function HomePage() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("auth");
      setIsLogged(!!auth);
    }
  }, []);

  const handleAddFanClick = () => {
    router.push(isLogged ? "/add-fan" : "/login");
  };

  const handleLoginClick = () => {
    router.push(isLogged ? "/add-fan" : "/login");
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Fãs da FURIA 💜</h1>
        <div className="flex gap-2">
          <button
            onClick={handleAddFanClick}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            + Adicionar-me como Fã
          </button>
          <button
            onClick={handleLoginClick}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Login
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {mockFans.map((fan, index) => (
          <FanCard key={index} {...fan} />
        ))}
      </div>
    </main>
  );
}

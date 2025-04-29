"use client";

import { useRouter } from "next/navigation";
import { useFanContext } from "@/contexts/FanContextType";
import Navbar from "@/components/Navbar";
import FanCard from "@/components/FanCard";

export default function FavoritesPage() {
  const { fans } = useFanContext();
  const router = useRouter();

  const favoriteFans = fans.filter((fan) => fan.isFavorite);

  return (
    <main className="p-6 min-h-screen bg-[url(/Torcida-FURIA-IEM-Rio-Major-2022.jpg)]">
      <Navbar />

      <div className="flex justify-center items-center mb-8 mt-4">
        <h1 className="text-3xl font-bold text-white">Meus Fãs Favoritos</h1>
      </div>

      {favoriteFans.length === 0 ? (
        <p className="text-center text-gray-300 text-xl">Nenhum fã favoritado ainda.</p>
      ) : (
        <div className="flex flex-wrap gap-4 w-full justify-center">
          {favoriteFans.map((fan) => (
            <FanCard key={fan.id} {...fan} />
          ))}
        </div>
      )}
    </main>
  );
}

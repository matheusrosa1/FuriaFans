"use client";


import FanProfileView from "@/components/FanProfileView";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { useFanContext } from "@/contexts/FanContextType";

export default function FavoritesPage() {
  const { fans } = useFanContext();
  const router = useRouter();

  // Filtra apenas os favoritos
  const favoriteFans = fans.filter((fan) => fan.isFavorite);

  if (favoriteFans.length === 0) {
    return (
      <main className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex justify-end w-full max-w-2xl mb-6 gap-4">
          <Button label="Home" onClick={() => router.push("/")} />
          <Button label="Drops" onClick={() => router.push("/drops")} />
        </div>
        <p className="text-gray-700 text-xl">Nenhum fã favoritado ainda.</p>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center bg-[url(/Torcida-FURIA-IEM-Rio-Major-2022.jpg)]">
      <div className="flex justify-end w-full max-w-2xl mb-6 gap-4">
        <Button label="Home" onClick={() => router.push("/")} />
        <Button label="Drops" onClick={() => router.push("/drops")} />
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">Meus Fãs Favoritos</h1>

      <div className="flex flex-col gap-6 items-center">
        {favoriteFans.map((fan) => (
          <FanProfileView key={fan.id} fan={fan} showFavoriteButton />
        ))}
      </div>
    </main>
  );
}

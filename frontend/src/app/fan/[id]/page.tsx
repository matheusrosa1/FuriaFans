"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { useFanContext } from "@/contexts/FanContextType";
import FanProfileView from "@/components/FanProfileView";



export default function FanIdPage() {
  const { id } = useParams();
  const { fans } = useFanContext();
  const router = useRouter();

  const fan = fans.find((fan) => fan.id === id);

  if (!fan) {
    return (
      <main className="p-6 min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-gray-600">Fã não encontrado.</p>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center bg-[url(/Torcida-FURIA-IEM-Rio-Major-2022.jpg)]">
      <div className="flex justify-end w-full max-w-2xl mb-6 gap-4">
        <Button label="Home" onClick={() => router.push("/")} />
        <Button label="Drops" onClick={() => router.push("/drops")} />
      </div>

      {/* Agora usando FanProfileView */}
      <FanProfileView fan={fan} showFavoriteButton />
    </main>
  );
}

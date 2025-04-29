"use client";

import { useParams, useRouter } from "next/navigation";
import { useFanContext } from "@/contexts/FanContextType";
import FanProfileView from "@/components/FanProfileView";
import Navbar from "@/components/Navbar";



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
      <Navbar />

      <FanProfileView fan={fan} showFavoriteButton />
    </main>
  );
}

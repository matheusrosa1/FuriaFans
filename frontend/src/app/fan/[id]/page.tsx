"use client";

import { useParams, useRouter } from "next/navigation";
import { useFanContext } from "@/contexts/FanContextType";
import FanProfileView from "@/components/FanProfileView";
import Navbar from "@/components/Navbar";
import DropList from "@/components/DropList";

export default function FanIdPage() {
  const { id } = useParams();
  const router = useRouter();
  const fanId = Array.isArray(id) ? id[0] : id;

  const { fans } = useFanContext();
  const fan = fans.find((fan) => fan.id === fanId);

  console.log("FanIdPage", fanId);

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
      <DropList onlyByFanId={fanId} />
    </main>
  );
}

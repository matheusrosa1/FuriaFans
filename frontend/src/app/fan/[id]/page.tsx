"use client";

import { useParams, useRouter } from "next/navigation";
import { useFanContext } from "@/contexts/FanContextType";
import { useFanProfile } from "@/contexts/FanProfileContext";
import FanProfileView from "@/components/FanProfileView";
import DropList from "@/components/DropList";
import Navbar from "@/components/Navbar";

export default function FanIdPage() {
  const { id } = useParams();
  const router = useRouter();
  const fanId = Array.isArray(id) ? id[0] : id;

  const { fans } = useFanContext();
  const { fanProfile } = useFanProfile();

  const fan = fans.find((f) => f.id === fanId);

  if (!fan) {
    return (
      <main className="p-6 min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-gray-600">Fã não encontrado.</p>
      </main>
    );
  }

  const isOwnProfile = fanProfile?.id === fan.id;

  return (
    <main className="p-6 bg-gray-100 min-h-screen bg-[url(/Torcida-FURIA-IEM-Rio-Major-2022.jpg)] flex flex-col items-center">
      <Navbar />

      <div className="w-full flex flex-col items-center mt-8">
        <FanProfileView fan={fan} showFavoriteButton={!isOwnProfile} />
      </div>

      <div className="w-full max-w-2xl mt-10">
        <h2 className="text-xl font-bold text-white mb-4 text-center">Drops de {fan.nickname}</h2>
        <DropList onlyByFanId={fan.id} />
      </div>
    </main>
  );
}

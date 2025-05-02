"use client";

import { useParams, useRouter } from "next/navigation";
import { useFanContext } from "@/contexts/FanListContext";
import { useFanProfile } from "@/contexts/FanProfileContext";
import { useDrops } from "@/contexts/DropsContext";
import FanProfileView from "@/components/FanProfileView";
import DropList from "@/components/DropList";
import Navbar from "@/components/Navbar";

export default function FanIdPage() {
  const { id } = useParams();
  const fanId = Array.isArray(id) ? id[0] : id;

  const { fans } = useFanContext();
  const { fanProfile } = useFanProfile();
  const { messages } = useDrops(); // 👈 Agora pegamos os drops aqui também!

  const fan = fans.find((f) => f.id === fanId);

  if (!fan) {
    return (
      <main className="p-6 min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-gray-600">Fã não encontrado.</p>
      </main>
    );
  }

  const isOwnProfile = fanProfile?.id === fan.id;

  // Novo: filtrar drops desse fã
  const fanDrops = messages.filter((msg) => msg.fanId === fan.id);

  return (
    <main className="p-6 bg-gray-100 min-h-screen bg-[url(/Torcida-FURIA-IEM-Rio-Major-2022.jpg)] flex flex-col items-center">
      <Navbar />

      <div className="w-full flex flex-col items-center mt-8">
        <FanProfileView fan={fan} showFavoriteButton={!isOwnProfile} />
      </div>

      <div className="w-full max-w-2xl mt-10">
        <h2 className="text-xl font-bold text-white mb-4 text-center">
          Drops de {fan.nickname}
        </h2>

        {/* Verifica se tem drops */}
        {fanDrops.length === 0 ? (
          <p className="text-center bg-purple-400 text-lg animate-pulse mt-8">
            🎮 {fan.nickname} ainda não compartilhou nenhum drop.
          </p>
        ) : (
          <DropList onlyByFanId={fan.id} />
        )}
      </div>
    </main>
  );
}

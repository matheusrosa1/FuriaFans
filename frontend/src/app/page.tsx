"use client";

import { useRouter } from "next/navigation";
import FanCard from "@/components/FanCard";
import Navbar from "@/components/Navbar";
import { useFanContext } from "@/contexts/FanListContext";

export default function HomePage() {
  const { fans } = useFanContext();
  const router = useRouter();

  return (
    <main className="p-6 min-h-screen bg-[url(/Torcida-FURIA-IEM-Rio-Major-2022.jpg)]">
      <Navbar />

      <div className="flex justify-center items-center mb-8 mt-4">
        <h1 className="text-3xl font-bold flex gap-5 text-white">
          <img src="/furiaLogo.png" alt="Logo" width={50} /> Fãs da Fúria
        </h1>
      </div>

      <div className="flex flex-wrap gap-4 w-full justify-center">
        {fans.map((fan) => (
          <FanCard key={fan.id} {...fan} />
        ))}
      </div>
    </main>
  );
}

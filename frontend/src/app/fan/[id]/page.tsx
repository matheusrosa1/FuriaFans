// src/app/fan/[id]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FanProfile } from "../../../interfaces/fanProfile";
import FanCard from "../../../components/FanCard";
import { useFanProfile } from "@/contexts/FanProfileContext";



export default function FanIdPage() {
  const { id: nickname } = useParams();
  const { fanProfile } = useFanProfile();
  
  if (!fanProfile) {
    return (
      <main className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-600">Fã não encontrado.</p>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Perfil do Fã</h1>
      <FanCard
        nickName={fanProfile.nickName}
        favoriteGame={fanProfile.favoriteGame}
        fanLevel={fanProfile.fanLevel}
        photoUrl={fanProfile.photoUrl}
      />
    </main>
  );
}

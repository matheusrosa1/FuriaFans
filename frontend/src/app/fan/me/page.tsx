"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFanProfile } from "@/contexts/FanProfileContext";
import { Button } from "@/components/Button";
import { FanProfile } from "@/interfaces/fanProfile";

export default function FanMePage() {
  const router = useRouter();
  const { fanProfile, setFanProfile } = useFanProfile();
  const [editingField, setEditingField] = useState<keyof typeof fanProfile | null>(null);
  const [tempValue, setTempValue] = useState<string>("");

  if (!fanProfile) {
    return (
      <main className="p-6 min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-xl">Carregando perfil...</p>
      </main>
    );
  }

  const handleEdit = (key: keyof FanProfile) => {
    setEditingField(key);
    setTempValue(fanProfile ? fanProfile[key] ?? "" : "");
  };
  

  const handleSave = () => {
    if (!fanProfile || !editingField) return;
    const updatedProfile = { ...fanProfile, [editingField]: tempValue };
    setFanProfile(updatedProfile);
    setEditingField(null);
  };

  const labels: Record<string, string> = {
    nickName: "Nick Name",
    favoriteGame: "Jogo Favorito",
    photoUrl: "Foto de Perfil",
    fanLevel: "Nível de Fã",
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="flex justify-end w-full max-w-2xl mb-6 gap-4">
        <Button label="Home" onClick={() => router.push("/")} />
        <Button label="Drops" onClick={() => router.push("/drops")} />
      </div>

      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-center">Meu Perfil</h1>

        {fanProfile.photoUrl && (
          <img
            src={fanProfile.photoUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border mb-4"
          />
        )}

        <ul className="text-sm text-gray-800 w-full max-w-sm">
          {Object.entries(fanProfile).map(([key, value]) => (
            key === "photoUrl" ? null : (
              <li key={key} className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                {editingField === key ? (
                  <div className="flex flex-col sm:flex-row sm:items-center w-full gap-2">
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="border rounded px-2 py-1 w-full sm:w-2/3"
                    />
                    <Button
                      label="Salvar"
                      onClick={handleSave}
                      type="button"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-2">
                    <span>
                      <strong>{labels[key] || key}:</strong> {value || "-"}
                    </span>
                    <Button
                      label="Editar"
                      onClick={() => handleEdit(key as keyof typeof FanProfile)}
                      type="button"
                    />
                  </div>
                )}
              </li>
            )
          ))}
        </ul>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import EditProfilePhoto from "@/components/EditProfilePhoto"; 
import { useFanProfile } from "@/contexts/FanProfileContext";
import { useFanContext } from "@/contexts/FanListContext";
import Navbar from "@/components/Navbar";
import { FanProfile } from "@/interfaces/FanProfile";

export default function FanMePage() {
  const router = useRouter();
  const { fanProfile, setFanProfile } = useFanProfile();
  const { updateFan } = useFanContext();
  const [editingField, setEditingField] = useState<keyof FanProfile | null>(null);
  const [tempValue, setTempValue] = useState<string>("");
  const [editingPhoto, setEditingPhoto] = useState(false);

  if (!fanProfile) {
    return (
      <main className="p-6 min-h-screen flex items-center justify-center bg-gray-100">
        <Navbar />
        <p className="text-gray-700 text-xl mt-8">Carregando perfil...</p>
      </main>
    );
  }

  const handleEdit = (key: keyof FanProfile) => {
    setEditingField(key);
    setTempValue(fanProfile[key]?.toString() ?? "");
  };

  const handleSave = () => {
    if (!fanProfile || !editingField) return;
    
    const updatedProfile = { ...fanProfile, [editingField]: tempValue };

    setFanProfile(updatedProfile);
    updateFan(fanProfile.id, { [editingField]: tempValue });
    setEditingField(null);
  };

  const handlePhotoSave = (newPhotoUrl: string) => {
    if (!fanProfile) return;

    const updatedProfile = { ...fanProfile, photoUrl: newPhotoUrl };

    setFanProfile(updatedProfile);
    updateFan(fanProfile.id, { photoUrl: newPhotoUrl });
    setEditingPhoto(false);
  };

  const labels: Record<string, string> = {
    nickname: "Nickname",
    favoriteGame: "Jogo Favorito",
    fanLevel: "Nível de Fã",
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center bg-[url(/Torcida-FURIA-IEM-Rio-Major-2022.jpg)]">

      <Navbar />

      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow flex flex-col items-center mt-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Meu Perfil</h1>

        {!editingPhoto ? (
          <>
          { (fanProfile.photoUrl) ? (
            <img
              src={fanProfile.photoUrl}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border mb-4"
            />
          ) : (
            <img 
            src={`https://ui-avatars.com/api/?name=${fanProfile?.nickname.replace(" ", "+")}&background=random`}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover mb-4"
            />
          )}
            <Button
              label="Editar Foto"
              onClick={() => setEditingPhoto(true)}
              type="button"
            />
          </>
        ) : (
          <EditProfilePhoto
            onSave={handlePhotoSave}
            onCancel={() => setEditingPhoto(false)}
          />
        )}

        <ul className="text-sm text-gray-800 w-full max-w-sm mt-6">
          {Object.entries(fanProfile)
            .filter(([key]) => key !== "id" && key !== "photoUrl" && key !== "photoFile" && key !== "email")
            .map(([key, value]) => (
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
                      onClick={() => handleEdit(key as keyof FanProfile)}
                      type="button"
                    />
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}

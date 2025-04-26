"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FanProfile } from "../../../../interfaces/fanProfile";


export default function FanMePage() {
  const router = useRouter();
  const [fanProfile, setFanProfile] = useState<FanProfile | null>(null);
  const [editingField, setEditingField] = useState<keyof FanProfile | null>(null);
  const [tempValue, setTempValue] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("fanProfile");
    if (stored) {
      setFanProfile(JSON.parse(stored));
    }
  }, []);

  const handleEdit = (key: keyof FanProfile) => {
    setEditingField(key);
    setTempValue(fanProfile ? fanProfile[key] ?? "" : "");
  };

  const handleSave = () => {
    if (!fanProfile || !editingField) return;
    const updatedProfile = { ...fanProfile, [editingField]: tempValue };
    localStorage.setItem("fanProfile", JSON.stringify(updatedProfile));
    setFanProfile(updatedProfile);
    setEditingField(null);
  };

  const labels: Record<keyof FanProfile, string> = {
    nickname: "Nick Name",
    favoriteGame: "Jogo favorito",
    photoUrl: "Foto do perfil",
    fanLevel: "Nível de fã",
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="flex justify-end w-full max-w-2xl mb-4">
        <button
          onClick={() => router.push("/")}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-sm mr-2"
        >
          Home
        </button>
        <button
          onClick={() => router.push("/drops")}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-sm"
        >
          Drops
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-center">Meu Perfil</h1>

        {!fanProfile ? (
          <p className="text-center text-gray-600">Nenhum perfil encontrado.</p>
        ) : (
          <div className="flex flex-col items-center gap-4">
            {fanProfile.photoUrl && (
              <img
                src={fanProfile.photoUrl}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border"
              />
            )}
            <ul className="text-sm text-gray-800 w-full max-w-sm">
              {Object.entries(fanProfile).map(([key, value]) => (
                key === "photoUrl" ? null : (
                  <li key={key} className="mb-4 flex justify-between items-center">
                    {editingField === key ? (
                      <>
                        <input
                          type="text"
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          className="border rounded px-2 py-1 w-2/3"
                        />
                        <button
                          onClick={handleSave}
                          className="bg-green-500 text-white text-xs px-2 py-1 rounded ml-2"
                        >
                          Salvar
                        </button>
                      </>
                    ) : (
                      <>
                        <span>
                          <strong>{labels[key as keyof FanProfile] || key}:</strong> {value || "-"}
                        </span>
                        <button
                          onClick={() => handleEdit(key as keyof FanProfile)}
                          className="bg-purple-500 text-white text-xs px-2 py-1 rounded ml-2"
                        >
                          Editar
                        </button>
                      </>
                    )}
                  </li>
                )
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

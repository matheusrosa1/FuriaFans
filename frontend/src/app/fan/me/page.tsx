"use client";

import { useEffect, useState } from "react";

export default function FanMePage() {
  const [fanProfile, setFanProfile] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("fanProfile");
    if (stored) {
      setFanProfile(JSON.parse(stored));
    }
  }, []);

  const campos = [
    { chave: "name", label: "Nome" },
    { chave: "favoriteGame", label: "Jogo favorito" },
    { chave: "fanLevel", label: "Nível de fã" },
  ];

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Meu Perfil</h1>

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
              {campos.map(({ chave, label }) => (
                <li key={chave} className="mb-2">
                  <strong>{label}:</strong> {fanProfile[chave] || "-"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
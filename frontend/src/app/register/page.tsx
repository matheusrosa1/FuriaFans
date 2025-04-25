"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const fanId = crypto.randomUUID();
    localStorage.setItem("auth", JSON.stringify({ fanId, email }));
    console.log("Usuário cadastrado:", { email, fanId });

    // Redireciona para criar perfil após o cadastro
    router.push("/add-fan");
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">E-mail:</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <label className="block mb-6">
          <span className="block text-sm font-medium text-gray-700">Senha:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Cadastrar-se
        </button>
      </form>
    </main>
  );
}
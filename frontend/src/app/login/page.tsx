// src/app/login/page.tsx

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const fakeFanId = crypto.randomUUID();
    localStorage.setItem("auth", JSON.stringify({ fanId: fakeFanId, email }));
    console.log("Usuário logado com:", { email, fanId: fakeFanId });

    const redirectPath = localStorage.getItem("redirectAfterAuth");
    localStorage.removeItem("redirectAfterAuth");

    const profile = localStorage.getItem("fanProfile");
    if (!profile) {
      router.push("/add-fan");
    } else {
      router.push(redirectPath || "/");
    }
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Login de Fã</h1>

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
          Entrar
        </button>
      </form>
    </main>
  );
}

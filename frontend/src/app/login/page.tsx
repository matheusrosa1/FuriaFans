// src/app/login/page.tsx

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useFanProfile } from "@/contexts/FanProfileContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setLogged } = useAuth();
  const router = useRouter();
  const { fanProfile } = useFanProfile();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const fakeFanId = crypto.randomUUID();
      
      localStorage.setItem("auth", "true");

      console.log("Usuário logado com:", { email, fanId: fakeFanId });
      setLogged(true);

      const redirectPath = localStorage.getItem("redirectAfterAuth");
      localStorage.removeItem("redirectAfterAuth");

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!fanProfile) {
        router.push("/add-fan");
      } else {
        router.push(redirectPath || "/");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex items-center justify-center ">
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
        <Button
          type="submit"
          label="Entrar"
          disabled={isLoading}
          fullWidth
          />
  
      </form>
    </main>
  );
}

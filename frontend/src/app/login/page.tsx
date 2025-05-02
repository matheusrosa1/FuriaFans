"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useFanProfile } from "@/contexts/FanProfileContext";
import Input from "@/components/Input";
import NavbarAuth from "@/components/NavbarAuth";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setLogged } = useAuth();
  const router = useRouter();
  const { login } = useFanProfile();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
  
      if (!user) {
        alert("Nenhum usuário encontrado para esse email.");
        setIsLoading(false);
        return;
      }
  
      const fans = JSON.parse(localStorage.getItem('fans') || '[]');
      const fan = fans.find((fan: any) => fan?.email?.toLowerCase() === email.toLowerCase());
  
      localStorage.setItem("auth", "true");
      localStorage.setItem("authEmail", email);
      localStorage.setItem("authId", user.authId);
  
      setLogged(true, email);
  
      await new Promise((resolve) => setTimeout(resolve, 500));
  
      await login(email);
  
      const redirectPath = localStorage.getItem("redirectAfterAuth");
      localStorage.removeItem("redirectAfterAuth");
  
      if (!fan?.nickname) {
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
    <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center bg-[url(/Torcida-FURIA-IEM-Rio-Major-2022.jpg)]">
      <NavbarAuth /> {/* 👈 Adiciona o NavbarAuth aqui */}
      
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-white p-6 rounded-lg shadow mt-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Login de Fã</h1>

        <Input
          name="email"
          label="Email"
          value={email}
          handleInputChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          name="password"
          label="Senha"
          value={password}
          handleInputChange={(e) => setPassword(e.target.value)}
          isPassword
          required
        />
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

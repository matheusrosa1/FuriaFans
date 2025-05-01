// src/app/register/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";

export const INITIAL_STATE = {
  email: "",
  password: "",
  passwordConfirm: "",
}

export default function RegisterPage() {
  const [values, setValues] = useState(INITIAL_STATE);
  const router = useRouter();
  const { setLogged } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

 const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (values.password !== values.passwordConfirm) {
      alert("As senhas não coincidem.");
      return;
    }

    const fanId = crypto.randomUUID();

    // Atualiza localStorage
    localStorage.setItem("auth", "true");
    localStorage.setItem("authEmail", values.email);

    // ATUALIZA o CONTEXTO também!
    setLogged(true, values.email);

    router.push("/add-fan");
  }; 

/*   const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (values.password !== values.passwordConfirm) {
      alert("As senhas não coincidem.");
      return;
    }
  
    const fanId = crypto.randomUUID();
  
    const newFan = {
      id: fanId,
      nickname: "", // vazio no cadastro, vai preencher depois
      email: values.email,
    };
  
    const existingFans = JSON.parse(localStorage.getItem('fans') || '[]');
    existingFans.push(newFan);
    localStorage.setItem('fans', JSON.stringify(existingFans));
  
    // Atualiza localStorage de auth
    localStorage.setItem("auth", "true");
    localStorage.setItem("authEmail", values.email);
    localStorage.setItem("authId", fanId); // <-- Salva o ID também aqui!!
  
    setLogged(true, values.email);
  
    router.push("/add-fan");
  }; */
  

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>
        <Input 
          name="email"
          label="Email"
          value={values.email}
          handleInputChange={handleInputChange}
        />
        <Input
          name="password"
          label="Senha"
          value={values.password}
          handleInputChange={handleInputChange}
          isPassword
        />
        <Input
          name="passwordConfirm"
          label="Confirmar Senha"
          value={values.passwordConfirm}
          handleInputChange={handleInputChange}
          isPassword
        />
        <Button
          type="submit"
          label="Cadastrar-se"
          fullWidth
          reverseColor
        />
      </form>
    </main>
  );
}
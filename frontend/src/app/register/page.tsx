// src/app/register/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import { Button } from "@/components/Button";

export const INITIAL_STATE = {
  email: "",
  password: "",
  passwordConfirm: "",
}

export default function RegisterPage() {
  const [values, setValues] = useState(INITIAL_STATE);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const fanId = crypto.randomUUID();
    localStorage.setItem("auth", JSON.stringify({ fanId, email: values.email }));

    if (values.password !== values.passwordConfirm) {
      alert("As senhas não coincidem.");
      return;
    } else {
      router.push("/add-fan");
    }
  };

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
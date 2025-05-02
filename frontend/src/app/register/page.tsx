"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import { Button } from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import NavbarAuth from "@/components/NavbarAuth";
import { validatePassword } from "@/utils/passwordValidator";
import { checkPasswordRules } from "@/utils/checkPasswordRules"; // Nova função para feedback visual

export const INITIAL_STATE = {
  email: "",
  password: "",
  passwordConfirm: "",
};

export default function RegisterPage() {
  const [values, setValues] = useState(INITIAL_STATE);
  const [passwordRules, setPasswordRules] = useState({
    minLength: false,
    hasLetter: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const router = useRouter();
  const { setLogged } = useAuth();

  useEffect(() => {
    const authId = localStorage.getItem("authId");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((u: any) => u.authId === authId);

    if (authId && userExists) {
      router.replace("/");
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordRules(checkPasswordRules(value));
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const passwordError = validatePassword(values.password);
    if (passwordError) {
      alert(passwordError);
      return;
    }

    if (values.password !== values.passwordConfirm) {
      alert("As senhas não coincidem.");
      return;
    }

    const existingFans = JSON.parse(localStorage.getItem("fans") || "[]");
    const emailAlreadyExists = existingFans.some(
      (fan: any) => fan.email?.toLowerCase() === values.email.toLowerCase()
    );

    if (emailAlreadyExists) {
      alert("Este e-mail já possui um perfil de fã registrado. Por favor, faça login.");
      return;
    }

    const fanId = crypto.randomUUID();

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = [
      ...existingUsers,
      { email: values.email, authId: fanId }
    ];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem("auth", "true");
    localStorage.setItem("authEmail", values.email);
    localStorage.setItem("authId", fanId);

    setLogged(true, values.email);

    router.push("/add-fan");
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen flex flex-col items-center bg-[url(/Torcida-FURIA-IEM-Rio-Major-2022.jpg)]">
      <NavbarAuth />

      <form onSubmit={handleRegister} className="w-full max-w-sm bg-white p-6 rounded-lg shadow mt-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>

        <Input 
          name="email"
          label="Email"
          value={values.email}
          handleInputChange={handleInputChange}
          required
        />
        <Input
          name="password"
          label="Senha"
          value={values.password}
          handleInputChange={handleInputChange}
          isPassword
          required
        />

        {/* Feedback visual da senha */}
        <div className="mt-4 text-sm">
          <p className={passwordRules.minLength ? "text-green-600" : "text-red-600"}>
            {passwordRules.minLength ? "✔" : "✖"} Pelo menos 6 caracteres
          </p>
          <p className={passwordRules.hasLetter ? "text-green-600" : "text-red-600"}>
            {passwordRules.hasLetter ? "✔" : "✖"} Pelo menos uma letra
          </p>
          <p className={passwordRules.hasNumber ? "text-green-600" : "text-red-600"}>
            {passwordRules.hasNumber ? "✔" : "✖"} Pelo menos um número
          </p>
          <p className={passwordRules.hasSpecialChar ? "text-green-600" : "text-red-600"}>
            {passwordRules.hasSpecialChar ? "✔" : "✖"} Pelo menos um caractere especial (!@#$...)
          </p>
        </div>

        <Input
          name="passwordConfirm"
          label="Confirmar Senha"
          value={values.passwordConfirm}
          handleInputChange={handleInputChange}
          isPassword
          required
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
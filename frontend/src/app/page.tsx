"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FanCard from "../components/FanCard";
import { FanCardProps } from "../interfaces/fanCardProps";
import { mockFans } from "@/mocks/FansMock";
import { IoPersonSharp } from "react-icons/io5";
import { SiTheconversation } from "react-icons/si";

export default function HomePage() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [fans, setFans] = useState<FanCardProps[]>([]);

  useEffect(() => {
    const mockedFans = localStorage.getItem("fansMocked");
    if (!mockedFans) {
      localStorage.setItem("fansMocked", JSON.stringify(mockFans));
      const fansData = localStorage.getItem("fansMocked");
      if (fansData) {
        setFans(JSON.parse(fansData));
      }
    }

    setFans(JSON.parse(mockedFans || "[]"));
    const auth = localStorage.getItem("auth");

    setIsLogged(!!auth);
  }, []);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  const handleDropsClick = () => {
    router.push("/drops");
  };

  const handleProfileClick = () => {
    router.push("/fan/me");
  };

  return (
    <main className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex gap-5"><img src="/furiaLogo.png" alt="Logo" width={50} />Fãs da FÚRIA</h1>
        <div className="flex gap-2">
          {!isLogged && (
            <button
              onClick={handleRegisterClick}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Cadastrar-se
            </button>
          )}
          {!isLogged && (
            <button
              onClick={handleLoginClick}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Login
            </button>
          )}
          {isLogged && (
            <button
              onClick={handleDropsClick}
              className="border border-black text-black px-2 py-1 rounded hover:text-purple-700 hover:bg-purple-700 hover:text-white flex items-center gap-2"
            >
              <SiTheconversation size={20} />
              <span className="ml-2">Drops</span>
            </button>
          )}
          {isLogged && (
            <button
              onClick={handleProfileClick}
              className="text-black px-4 py-2 rounded hover:text-purple-700"
            >
              <IoPersonSharp size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 w-full">
        {fans.map((fan, index) => (
          <FanCard key={index} {...fan} />
        ))}
      </div>
    </main>
  );
}
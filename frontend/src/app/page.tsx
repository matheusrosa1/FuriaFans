// src/app/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FanCard from "../components/FanCard";
import { FanCardProps } from "../interfaces/fanCardProps";
import { mockFans } from "@/mocks/FansMock";
import { IoPersonSharp } from "react-icons/io5";
import { SiTheconversation } from "react-icons/si";
import { Button } from "@/components/Button";
import { MdLogout } from "react-icons/md";

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
            <Button
              label="Cadastrar-se"
              onClick={handleRegisterClick}
              />
          )}
          {!isLogged && (
            <Button
              label="Login"
              onClick={handleLoginClick}
              icon={<IoPersonSharp size={20} />}
            />
          )}
          {isLogged && (
              <Button
              label="Drops"
              onClick={handleDropsClick}
              icon={<SiTheconversation size={20} />}
            />
          )}
          {isLogged && (
            <Button
              label="Meu perfil"
              onClick={handleProfileClick}
              icon={<IoPersonSharp size={20} />}
            />
          )}
{/*           {isLogged && (
            <button
              onClick={handleProfileClick}
              className="text-black px-4 py-2 rounded hover:text-purple-700"
            >
              <IoPersonSharp size={20} />
            </button>
          )} */}
          {isLogged && (
            <Button
              label="Logout"
              icon={<MdLogout />}
              onClick={() => {
                localStorage.removeItem("auth");
                setIsLogged(false);
              }
              }
              />
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
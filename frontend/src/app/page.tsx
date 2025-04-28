"use client";

import { useRouter } from "next/navigation";
 // 👈 usando FanContext
import { IoPersonSharp } from "react-icons/io5";
import { SiTheconversation } from "react-icons/si";
import { MdLogout } from "react-icons/md";
import FanCard from "@/components/FanCard";
import { Button } from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext"; 
import { useFanContext } from "@/contexts/FanContextType";

export default function HomePage() {
  const router = useRouter();
  const { isLogged, setLogged } = useAuth();
  const { fans } = useFanContext(); // 👈 agora pega os fãs via Context

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

  const handleLogoutClick = () => {
    setLogged(false);
  };

  return (
    <main className="p-6 min-h-screen bg-[url(/Torcida-FURIA-IEM-Rio-Major-2022.jpg)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex gap-5 text-white">
          <img src="/furiaLogo.png" alt="Logo" width={50} />Fãs da Fúria
        </h1>

        <div className="flex gap-2">
          {!isLogged && (
            <>
              <Button label="Cadastrar-se" onClick={handleRegisterClick} />
              <Button
                label="Login"
                onClick={handleLoginClick}
                icon={<IoPersonSharp size={20} />}
              />
            </>
          )}
          {isLogged && (
            <>
              <Button
                label="Meu perfil"
                onClick={handleProfileClick}
                icon={<IoPersonSharp size={20} />}
              />
              <Button
                label="Logout"
                onClick={handleLogoutClick}
                icon={<MdLogout />}
              />
            </>
          )}
          <Button
            label="Drops"
            onClick={handleDropsClick}
            icon={<SiTheconversation size={20} />}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 w-full">
        {fans.map((fan) => (
          <FanCard key={fan.id} {...fan} />
        ))}
      </div>
    </main>
  );
}

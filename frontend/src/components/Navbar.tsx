"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/Button";
import { useFanProfile } from "@/contexts/FanProfileContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // 👈 Captura a rota atual
  const { isLogged, setLogged } = useAuth();
  const { setFanProfile } = useFanProfile();

  const handleLogout = () => {
    setLogged(false);
    localStorage.removeItem("currentFanProfile");
    setFanProfile(null);
    localStorage.removeItem('auth');
    localStorage.removeItem('authEmail');
    router.push("/");
  };

  return (
    <nav className="p-4 flex justify-center gap-4">
      {pathname !== "/" && (
        <Button label="Home" onClick={() => router.push("/")} />
      )}

      {isLogged ? (
        <>
          {pathname !== "/fan/me" && (
            <Button label="Meu Perfil" onClick={() => router.push("/fan/me")}  />
          )}
          {pathname !== "/favorites" && (
            <Button label="Favoritos" onClick={() => router.push("/favorites")}  />
          )}
          {pathname !== "/drops" && (
            <Button label="Drops" onClick={() => router.push("/drops")}  />
          )}
          <Button label="Logout" onClick={handleLogout}  />
        </>
      ) : (
        <>
          <Button label="Cadastrar-se" onClick={() => router.push("/register")}  />
          <Button label="Login" onClick={() => router.push("/login")}  />
          {pathname !== "/drops" && (
            <Button label="Drops" onClick={() => router.push("/drops")}  />
          )}
        </>
      )}
    </nav>
  );
}

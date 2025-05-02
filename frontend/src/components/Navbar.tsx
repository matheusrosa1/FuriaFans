"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/Button";
import { useFanProfile } from "@/contexts/FanProfileContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLogged, setLogged } = useAuth();
  const { fanProfile, setFanProfile } = useFanProfile(); // <- agora pegamos o fanProfile também

  const handleLogout = () => {
    setLogged(false);
    localStorage.removeItem("currentFanProfile");
    setFanProfile(null);
    localStorage.removeItem('auth');
    localStorage.removeItem('authEmail');
    localStorage.removeItem('authId');
    router.push("/");
  };

  return (
    <nav className="p-4 flex justify-center gap-4">
      {pathname !== "/" && (
        <Button label="Home" onClick={() => router.push("/")} />
      )}

      {isLogged ? (
        <>
          {!fanProfile && (
            <Button label="Tornar-me Fã" onClick={() => router.push("/register")} />
          )}

          {fanProfile && pathname !== "/fan/me" && (
            <Button label="Meu Perfil" onClick={() => router.push("/fan/me")} />
          )}

          {pathname !== "/favorites" && (
            <Button label="Favoritos" onClick={() => router.push("/favorites")} />
          )}
          {pathname !== "/drops" && (
            <Button label="Drops" onClick={() => router.push("/drops")} />
          )}
          <Button label="Logout" onClick={handleLogout} />
        </>
      ) : (
        <>
          <Button label="Cadastrar-se" onClick={() => router.push("/register")} />
          <Button label="Login" onClick={() => router.push("/login")} />
          {pathname !== "/drops" && (
            <Button label="Drops" onClick={() => router.push("/drops")} />
          )}
        </>
      )}
    </nav>
  );
}

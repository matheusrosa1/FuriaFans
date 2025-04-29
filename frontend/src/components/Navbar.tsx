import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/Button";

export default function Navbar() {
  const router = useRouter();
  const { isLogged, setLogged } = useAuth();

  const handleLogout = () => {
    setLogged(false);
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 p-4 flex justify-center gap-4">
      <Button label="Home" onClick={() => router.push("/")} />

      {isLogged ? (
        <>
          <Button label="Favoritos" onClick={() => router.push("/favorites")}  />
          <Button label="Drops" onClick={() => router.push("/drops")}  />
          <Button label="Meu Perfil" onClick={() => router.push("/fan/me")}  />
          <Button label="Logout" onClick={handleLogout}  />
        </>
      ) : (
        <>
          <Button label="Cadastrar-se" onClick={() => router.push("/register")}  />
          <Button label="Login" onClick={() => router.push("/login")}  />
          <Button label="Drops" onClick={() => router.push("/drops")}  />
        </>
      )}
    </nav>
  );
}

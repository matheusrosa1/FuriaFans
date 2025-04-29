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
    <nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-md shadow-md p-4 flex justify-center gap-4">
      <Button label="Home" onClick={() => router.push("/")} reverseColor />

      {isLogged ? (
        <>
          <Button label="Favoritos" onClick={() => router.push("/favorites")} reverseColor />
          <Button label="Drops" onClick={() => router.push("/drops")} reverseColor />
          <Button label="Meu Perfil" onClick={() => router.push("/fan/me")} reverseColor />
          <Button label="Logout" onClick={handleLogout} reverseColor />
        </>
      ) : (
        <>
          <Button label="Cadastrar-se" onClick={() => router.push("/register")} reverseColor />
          <Button label="Login" onClick={() => router.push("/login")} reverseColor />
          <Button label="Drops" onClick={() => router.push("/drops")} reverseColor />
        </>
      )}
    </nav>
  );
}

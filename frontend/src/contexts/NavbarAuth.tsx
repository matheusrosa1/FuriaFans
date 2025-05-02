import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

export default function NavbarAuth() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 2) {
      window.history.back();
    } else {
      router.push("/");
    }
  };

  return (
    <nav className="p-4 flex justify-center gap-4">
      <div className="flex items-center">
      <Button label="Voltar" onClick={handleBack} />
      </div>
      </nav>
  );
}
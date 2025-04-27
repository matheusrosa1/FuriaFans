import { useState, useEffect } from "react";

export function useAuth() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const logged = localStorage.getItem("isLogged");
      setIsLogged(logged === "true");
    }
  }, []);

  return { isLogged };
}
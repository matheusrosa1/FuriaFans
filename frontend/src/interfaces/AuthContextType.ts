export interface AuthContextType {
  isLogged: boolean;
  email: string | null;
  setLogged: (value: boolean, email?: string) => void;
  isAuthLoading: boolean;
}

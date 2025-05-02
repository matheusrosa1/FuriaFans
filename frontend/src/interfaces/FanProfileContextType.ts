import { FanProfile } from "./FanProfile";

export interface FanProfileContextType {
  fanProfile: FanProfile | null;
  createFanProfile: (
    nickname: string,
    email: string,
    favoriteGame: string,
    fanLevel: 'casual' | 'engaged' | 'hardcore',
    photoUrl?: string
  ) => void;
  setFanProfile: (fanProfile: FanProfile | null) => void;
  login: (email: string) => void;
  logout: () => void;
}
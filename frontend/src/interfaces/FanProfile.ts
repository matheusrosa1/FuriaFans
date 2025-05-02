export interface FanProfile {
  id: string;
  nickname: string;
  favoriteGame: string;
  fanLevel: 'casual' | 'engaged' | 'hardcore';
  photoUrl?: string;
  photoFile?: File | null;
  email: string;
}

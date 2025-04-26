export interface FanProfile {
  nickname: string;
  favoriteGame: string;
  photoUrl?: string;
  photoFile?: File | null;
  fanLevel: 'casual' | 'engaged' | 'hardcore';
}

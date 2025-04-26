export interface FanProfile {
  nickname: string;
  favoriteGame: string;
  photoUrl?: string;
  fanLevel: 'casual' | 'engaged' | 'hardcore';
}

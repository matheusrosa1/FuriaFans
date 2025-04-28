export interface FanCardProps {
  nickname: string;
  favoriteGame: string;
  fanLevel: 'casual' | 'engaged' | 'hardcore';
  photoUrl?: string;
  photoFile?: File | null;
}

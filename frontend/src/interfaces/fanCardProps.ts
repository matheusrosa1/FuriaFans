export interface FanCardProps {
  nickName: string;
  favoriteGame: string;
  fanLevel: 'casual' | 'engaged' | 'hardcore';
  photoUrl?: string;
  photoFile?: File | null;
}

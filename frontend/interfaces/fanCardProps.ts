export interface FanCardProps {
  name: string;
  favoriteGame: string;
  fanLevel: 'casual' | 'engaged' | 'hardcore';
  photoUrl?: string;
}

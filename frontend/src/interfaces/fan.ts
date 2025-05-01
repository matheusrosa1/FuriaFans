// src/interfaces/fan.ts

export interface Fan {
  id: string;
  nickname: string;
  favoriteGame: string;
  fanLevel: 'casual' | 'engaged' | 'hardcore';
  photoUrl?: string;
  photoFile?: File | null;
  isFavorite?: boolean;
  email: string;
}

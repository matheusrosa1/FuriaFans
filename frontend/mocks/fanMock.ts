import { FanRecord } from "@/interfaces/FanRecord";

export const fanMock: FanRecord = {
  id: '1',
  nickname: 'Fã Teste',
  favoriteGame: 'Counter-Strike',
  fanLevel: 'engaged',
  photoUrl: 'https://example.com/avatar.png',
  photoFile: null,
  isFavorite: true,
  favoritedByIds: ['123', '456'],
  email: 'fate@teste.com',
};

import { screen } from '@testing-library/react';
import FanProfileView from '@/components/FanProfileView';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import { fanMock } from '../../mocks/fanMock';

describe('FanProfileView', () => {
  beforeEach(() => {
    renderWithProviders(<FanProfileView fan={fanMock} />);
  });

  it('deve renderizar o nickname do fã', () => {
    const nickname = screen.getByRole('heading', { name: fanMock.nickname });
    expect(nickname).toBeInTheDocument();
  });

  it('deve renderizar a imagem do fã', () => {
    const fanImage = screen.getByRole('img', { name: 'Avatar' });
    expect(fanImage).toBeInTheDocument();
    expect(fanImage).toHaveAttribute('src', fanMock.photoUrl);
  });

  it('deve renderizar o jogo favorito do fã', () => {
    const favoriteGame = screen.getByText((content, element) =>
      content.includes(fanMock.favoriteGame)
    );
    expect(favoriteGame).toBeInTheDocument();
  });

  it('deve renderizar o nível de fã', () => {
    const fanLevel = screen.getByText((content, element) =>
      content.includes(fanMock.fanLevel)
    );
    expect(fanLevel).toBeInTheDocument();
  });
});

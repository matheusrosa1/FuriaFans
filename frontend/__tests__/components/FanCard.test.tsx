import { screen } from '@testing-library/react';
import FanCard from '@/components/FanCard';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import { fanMock } from '../../src/mocks/fanMock';


jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  }),
}));


describe('FanCard', () => {
  beforeEach(() => {
    renderWithProviders(<FanCard {...fanMock} />);
  });

  it('deve renderizar o nickname do fã', () => {
    const fanName = screen.getByText(fanMock.nickname);
    expect(fanName).toBeInTheDocument();
  });

  it('deve renderizar o jogo favorito do fã', () => {
    const favoriteGame = screen.getByText((content, element) => {
      return content.includes(fanMock.favoriteGame);
    });
    expect(favoriteGame).toBeInTheDocument();
  });

  it('deve renderizar a imagem do fã corretamente', () => {
    const img = screen.getByRole('img', { name: `Foto de ${fanMock.nickname}` });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', fanMock.photoUrl);
  });

  it('deve renderizar o nível de fã corretamente', () => {
    const fanLevel = screen.getByText((content, element) => {
      return content.includes(fanMock.fanLevel);
    });
  
    expect(fanLevel).toBeInTheDocument();
  });
  
  it('deve renderizar o botão de favoritar desabilitado para usuários não logados', () => {
    const favoriteButton = screen.getByRole('button', { name: /favoritar/i });
  
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton).toBeDisabled();
    expect(favoriteButton).toHaveAttribute('title', 'Você deve estar logado para favoritar');
  });
  
  
});
 
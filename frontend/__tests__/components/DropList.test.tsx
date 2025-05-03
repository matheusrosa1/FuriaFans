import { screen, fireEvent } from '@testing-library/react';
import DropList from '@/components/DropList';
import { renderWithProviders } from '../../test-utils/renderWithProviders';

describe('DropList', () => {
  beforeEach(() => {
    renderWithProviders(<DropList />);
  });

  it('deve renderizar a lista de mensagens', () => {
    const firstMessage = screen.getByText('FURIA rumo ao topo! 💜');
    const secondMessage = screen.getByText('A torcida mais insana do CS está aqui!');

    expect(firstMessage).toBeInTheDocument();
    expect(secondMessage).toBeInTheDocument();
  });

  it('deve renderizar os botões de curtir mensagem', () => {
    const likeButtons = screen.getAllByRole('button', { name: 'Curtir mensagem' });
    expect(likeButtons.length).toBeGreaterThan(0); // Deve ter botões de curtir
  });

  it('deve permitir clicar no botão de curtir (se habilitado)', () => {
    const likeButtons = screen.getAllByRole('button', { name: 'Curtir mensagem' });

    fireEvent.click(likeButtons[0]);

  });
});

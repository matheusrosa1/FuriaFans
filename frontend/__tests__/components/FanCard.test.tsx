import { screen } from '@testing-library/react';
import FanCard from '@/components/FanCard';
import { fanMock } from '../../mocks/fanMock';
import { renderWithProviders } from '../../test-utils/renderWithProviders';


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
  it('deve renderizar o nickname do fã', () => {
    renderWithProviders(<FanCard {...fanMock} />);

    const fanName = screen.getByText(fanMock.nickname);
    expect(fanName).toBeInTheDocument();
  });
});

import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { FanProfileProvider } from '@/contexts/FanProfileContext';
import { FanProvider } from '@/contexts/FanListContext';
// Se precisar do DropsProvider futuramente, a gente adiciona!

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <FanProfileProvider>
        <FanProvider>
          {children}
        </FanProvider>
      </FanProfileProvider>
    </AuthProvider>
  );
}

export function renderWithProviders(ui: ReactNode) {
  return render(<Providers>{ui}</Providers>);
}

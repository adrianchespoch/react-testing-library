import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '../../../src/auth/context/AuthContext';
import { Navbar } from '../../../src/ui/components/Navbar';

// Saber si 1 hook de 1 libreria externa ha sido llamado: mock a toda la libreria <- requireActual
const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <Navbar />', () => {
  const contextValue = {
    logged: true,
    user: { id: 1, name: 'Alex Pro Auth' },
    logOut: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test('debe mostrar el nombre del user auth', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(contextValue.user.name)).toBeTruthy();
    expect(screen.getByLabelText('authUser').innerHTML).toBe('Alex Pro Auth');
  });

  test('debe llamar a logout & navigate al hacer click en tl btnLogout', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const btnLogout = screen.getByRole('button');
    fireEvent.click(btnLogout);

    expect(contextValue.logOut).toHaveBeenCalled();

    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });
});

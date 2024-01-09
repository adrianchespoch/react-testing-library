import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CalendarPage } from '../../src/calendar/pages/CalendarPage';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';

jest.mock('../../src/hooks/useAuthStore');

// //  Hacer Mok del FC para q no renderice todo el FC con sus hooks y demas
jest.mock('../../src/calendar/pages/CalendarPage', () => ({
  CalendarPage: () => <h1>Calendar Page</h1>,
}));

describe('pruebas en <AppRouter />', () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('debe renderizar el cargando y llamar  chechAuthToken', () => {
    useAuthStore.mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter />);

    expect(screen.getByText('Loading...')).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test('should renderizar el LoginPage en caso de no estar auth', () => {
    useAuthStore.mockReturnValue({
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuthToken,
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/some/route/tupac']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('Ingreso')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('should renderizar el CalendarPage si estamos auth', () => {
    useAuthStore.mockReturnValue({
      status: 'authenticated',
      checkAuthToken: mockCheckAuthToken,
    });

    // CalendarPage usa hooks, no los vamos a mockear sino q vamos a hacer Mock del FC
    render(
      <MemoryRouter initialEntries={['/some/route/tupac']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('Calendar Page')).toBeTruthy();
  });
});

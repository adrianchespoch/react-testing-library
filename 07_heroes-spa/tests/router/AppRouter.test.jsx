import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

// Aqui SI importa q se renderice el FC correctamente

describe('pruebas en AppRouter', () => {
  test('debe mostrar el login si NO esta auth', () => {
    render(
      <MemoryRouter initialEntries={['/dc']}>
        <AuthContext.Provider value={{ logged: false }}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toBe('Login');
  });

  test('debe renderizar <Marvel /> SI esta Auth', () => {
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider
          value={{ logged: true, user: { id: 1, name: 'Alex' } }}
        >
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toBe(
      'Marvel Comics'
    );

    expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
  });
});

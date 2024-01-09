import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AuthContext } from '../../src/auth/context/AuthContext';
import { PublicRoute } from '../../src/router/PublicRoute';

describe('Pruebas en PublicRoute', () => {
  test('si NO esta authenticated debe mostrar los children', () => {
    const contextValue = { logged: false };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Public Route</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Public Route')).toBeTruthy();
  });

  test('debe hacer el Navigate si el user esta auth', () => {
    // Como es Unit Testing solo pruebo q se redireccione a ese path, lo q se renderice le corresponde al testing de ese FC

    render(
      <AuthContext.Provider
        value={{ logged: true, user: { id: 1, name: 'Alex Auth' } }}
      >
        {/* Quiero acceder al  /login  siendo auth, asi q me redirecciona al   / */}
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoute>
                  <h1>Public Route</h1>
                </PublicRoute>
              }
            />

            {/* Si estoy auth esto es lo q se deberia mostrar. No es competencia del PublicRoute saber q renderiza ese path, sino que renderice algo */}
            <Route path="/" element={<h1>Marvel Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Marvel Page')).toBeTruthy();
  });
});

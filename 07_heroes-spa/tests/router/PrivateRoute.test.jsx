import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('Pruebas en PrivateRoute', () => {
  test('debe renderizar el children SI esta auth', () => {
    const contextValue = { logged: true, user: { id: 1, name: 'Alex Auth' } };

    // Saber si el localStorage fue llamado
    Storage.prototype.setItem = jest.fn();

    render(
      <AuthContext.Provider value={contextValue}>
        {/* Puedo hacerlo desde cualquier path valido y ese sera el path guardado en el localStorage */}
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <h1>Some child: Private Route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Some child: Private Route')).toBeTruthy();

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'lastPath',
      '/search?q=batman'
    );
  });

  test('debe hacer el Navigate al login si NO es auth', () => {
    render(
      <AuthContext.Provider value={{ logged: false }}>
        <MemoryRouter initialEntries={['/dc']}>
          <Routes>
            <Route
              path="*"
              element={
                <PrivateRoute>
                  <h1>Some child: Private Route</h1>
                </PrivateRoute>
              }
            />

            <Route path="login" element={<h1>Login Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Login Page')).toBeTruthy();
  });
});

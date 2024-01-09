import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../../src/09_useContext/context/UserContext';

import { MainApp } from '../../src/09_useContext/MainApp';

describe('Pruebas en <MainApp />', () => {
  test('debe renderizar el HomePage', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{}}>
          <MainApp />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('HomePage')).toBeTruthy();
  });

  test('debe renderizar el LoginPage', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <UserContext.Provider value={{}}>
          <MainApp />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('LoginPage')).toBeTruthy();
  });
});

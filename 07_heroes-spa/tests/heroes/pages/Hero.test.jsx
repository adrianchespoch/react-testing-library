import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { Hero } from '../../../src/heroes/pages/Hero';

// // Aqui necesitamos las Routes y Route xq se hace un  <Navigate/> en caso de no tener heroes

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <Hero />', () => {
  beforeEach(() => jest.clearAllMocks());

  test('NO debe renderizar <Hero /> si NO hay un heroe', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="hero" element={<Hero />} />

          <Route
            path="/"
            element={<h1 data-testid="no-hero">No hero page</h1>}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('no-hero')).toBeTruthy();
    expect(screen.getByText('No hero page')).toBeTruthy();
    expect(screen.getByTestId('no-hero').innerHTML).toBe('No hero page');
  });

  test('debe mostrar la Screen del hero valido enviado', () => {
    render(
      <MemoryRouter initialEntries={['/hero/marvel-iron']}>
        <Routes>
          <Route path="hero/:id" element={<Hero />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Iron Man')).toBeTruthy();
    expect(screen.getAllByText('Tony Stark').length).toBeGreaterThanOrEqual(1);
  });

  test('debe llamarse el navigate con el click en el btn de regresar', () => {
    render(
      <MemoryRouter initialEntries={['/hero/marvel-iron']}>
        <Routes>
          <Route path="hero/:id" element={<Hero />} />
        </Routes>
      </MemoryRouter>
    );

    const goBackBtn = screen.getByRole('button');
    fireEvent.click(goBackBtn);

    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });
});

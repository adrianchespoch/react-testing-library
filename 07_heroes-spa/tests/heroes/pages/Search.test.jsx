import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Search } from '../../../src/heroes/pages/Search';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <Navbar />', () => {
  beforeEach(() => jest.clearAllMocks());

  test('debe mostrar el nombre del user auth', () => {
    const { container } = render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test('debe renderizar a Batman y el input con el valor del queryString', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    expect(input.value).toBe('batman');

    const img = screen.getByRole('img');
    expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

    expect(screen.getByText('Batman')).toBeTruthy();
    expect(screen.getByText('Bruce Wayne')).toBeTruthy();

    // // No funca
    // expect(screen.getByLabelText('search')).not.toBeInTheDocument();

    /* // // Si se renderizara el alert con  style: display: none
    const alert = screen.getByLabelText('alert-danger');
    expect(alert.style.display).toBe('none');
     */
  });

  test('debe monstrar el error si NO se encuentra el hero', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=xyzd']}>
        <Search />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('nothing')).toBeTruthy();
    expect(screen.getByLabelText('nothing').innerHTML).toBe(
      'Nothing to do: xyzd'
    );
  });

  test('debe llamar el navigate con los params correctos', () => {
    const inputValue = 'green';

    render(
      <MemoryRouter initialEntries={['/search']}>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');

    // const form = screen.getByRole('searchForm');     // con un  role=''
    const form = screen.getByTestId('searchForm');     // con un   data-testid=''

    fireEvent.change(input, {
      target: { name: 'searchText', value: inputValue },
    });

    fireEvent.submit(form);

    expect(mockedUseNavigate).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
  });
});

import { render, screen } from '@testing-library/react';
import { UserContext } from '../../src/09_useContext/context/UserContext';
import { HomePage } from '../../src/09_useContext/HomePage';

describe('Pruebas en <HomePage />', () => {
  const user = { id: 1, name: 'Alex' };

  test('debe mostrar el componente SIN el user', () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <HomePage />
      </UserContext.Provider>
    );

    const preTag = screen.getByLabelText('pre'); // aria-label
    expect(preTag.innerHTML).toBe('null');
  });

  test('debe mostrar el componente CON el user', () => {
    render(
      <UserContext.Provider value={{ user }}>
        <HomePage />
      </UserContext.Provider>
    );

    const preTag = screen.getByLabelText('pre'); // aria-label
    expect(preTag.innerHTML).toContain(user.name);
    expect(preTag.innerHTML).toContain(user.id.toString());

    const smallTag = screen.getByLabelText('small');
    expect(smallTag.innerHTML).toBe(user.name);
  });
});

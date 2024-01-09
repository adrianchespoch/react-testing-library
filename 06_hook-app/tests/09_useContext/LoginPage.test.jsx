// Este componente no debe testear el comportamiento del useContext
// Debe testear q si viene un user se renderice, si NO viene, muestre null

import { fireEvent, render, screen } from '@testing-library/react';
import { UserContext } from '../../src/09_useContext/context/UserContext';
import { LoginPage } from '../../src/09_useContext/LoginPage';

describe('Pruebas en LoginPage.jsx', () => {
  test('debe mostrar el componente sin el usuario', () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <LoginPage />
      </UserContext.Provider>
    );

    const preTag = screen.getByLabelText('pre');
    expect(preTag.innerHTML).toBe('null');
  });

  test('debe llamar el settUserFx al hacer clic en el btn', () => {
    const setUserFx = jest.fn();

    render(
      <UserContext.Provider value={{ user: null, setUserFx }}>
        <LoginPage />
      </UserContext.Provider>
    );

    const loginBtn = screen.getByRole('button');
    fireEvent.click(loginBtn);

    expect(setUserFx).toHaveBeenCalled();
    expect(setUserFx).toHaveBeenCalledWith({
      id: 123,
      name: 'Alex',
      email: 'alex@test.com',
    });
  });
});

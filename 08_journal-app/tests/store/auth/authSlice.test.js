import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  demoUser,
  initState,
  notAuthenticatedState,
} from '../../fixtures/authFixtures';

describe('pruebas en authSlice', () => {
  test('debe retornar el inteState  y ser "auth"', () => {
    const state = authSlice.reducer(initState, {});

    // testing al name del slice
    expect(authSlice.name).toBe('auth');

    // retorne el initState xq no tiene action
    expect(state).toEqual(initState);
  });

  test('debe realizar la auth', () => {
    // login y demas reducer son Action creator function:
    // console.log(login(demoUser)); // retorna la action q se envia al reducer: type/payload

    const state = authSlice.reducer(initState, login(demoUser));
    expect(state).toEqual({
      status: 'authenticated',
      ...demoUser,
      errorMessage: null,
    });
  });

  test('debe realizar el logout sin args', () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage: undefined,
    });
  });

  test('debe realizar el logout y mostrar el errorMessage', () => {
    const errorMessage = 'Some error message!';

    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );

    expect(state).toEqual({ ...notAuthenticatedState, errorMessage });
  });

  test('debe cambiar el status a cheking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    expect(state).toEqual({ ...authenticatedState, status: 'checking' });
    expect(state.status).toBe('checking');
  });
});

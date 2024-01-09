import {
  authSlice,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  initState,
  notAuthenticatedState,
} from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';

describe('pruebas en authSlice', () => {
  test('debe retornar el defaul state', () => {
    expect(authSlice.getInitialState()).toEqual(initState);
    expect(authSlice.name).toBe('auth');
  });

  test('debe realizar el Login', () => {
    const state = authSlice.reducer(initState, onLogin(testUserCredentials));

    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test('debe hacer logout', () => {
    let state = authSlice.reducer(authenticatedState, onLogout());
    expect(state).toEqual(notAuthenticatedState);
  });

  test('debe hacer logout y lanzar el errorMessage', () => {
    const someErrorMessage = 'Some Error Message!';
    const state = authSlice.reducer(
      authenticatedState,
      onLogout(someErrorMessage)
    );

    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage: someErrorMessage,
    });
  });

  test('debe limpiar el errorMessage', () => {
    const someErrorMessage = 'Some Error Message!';
    const state = authSlice.reducer(
      authenticatedState,
      onLogout(someErrorMessage)
    );

    const newState = authSlice.reducer(state, clearErrorMessage());

    expect(newState.errorMessage).toBe(undefined);
    expect(newState).toEqual(notAuthenticatedState);
  });

  test('should establecer el checking', () => {
    const state = authSlice.reducer(authenticatedState, onChecking());

    expect(state).toEqual(initState);
  });
});

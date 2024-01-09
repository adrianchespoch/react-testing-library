import { authReducer } from '../../../src/auth/context/authReducer';
import { types } from '../../../src/auth/types/types';

describe('Pruebas en authReducer', () => {
  const initState = { logged: false };

  test('debe retornar el default state', () => {
    const newState = authReducer(initState, {});

    // Como se pasa x referencia, funciona el toBe xq apunta a la misma referencia al heap
    expect(newState).toBe(initState);
    expect(newState).toEqual(initState);
  });

  test('debe hacer login y establecer el user', () => {
    const action = { type: types.login, payload: { id: 1, name: 'Alex' } };
    const newState = authReducer(initState, action);

    expect(newState).toEqual({ logged: true, user: action.payload });
  });

  test('debe hacer logout y establecer el user en null', () => {
    const action = { type: types.logout, payload: { id: 1, name: 'Alex' } };
    const newState = authReducer(initState, action);

    expect(newState).toEqual({ ...initState, user: null });
  });
});

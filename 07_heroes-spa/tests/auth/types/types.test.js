import { types } from '../../../src/auth/types/types';

describe('pruebas en types', () => {
  test('debe retornar los types', () => {
    expect(types).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout',
    });
  });
});

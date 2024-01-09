import { getActiveUser, getUser } from '../../src/base-tests/05-funciones';

describe('Pruebas en 05-funciones.js', () => {
  test('should return an obj', () => {
    const testUser = { uid: 'ABND124AS', username: 'pro_plus-2244' };

    const user = getUser();

    // .toEqual()   <-    Objects
    expect(user).toEqual(testUser);
  });

  test('should return an object with correct name', () => {
    const name = 'Alex';
    const testUser = { uid: 'ADN123JKNA', username: name };

    expect(getActiveUser(name)).toStrictEqual(testUser);
  });
});

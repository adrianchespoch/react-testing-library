import { getHeroeByIdAsync } from '../../src/base-tests/09-promises';

describe('Pruebas sobre 09-promises.js', () => {
  test('should return a hero by ID', (done) => {
    const id = 1;

    getHeroeByIdAsync(id).then(hero => {
      expect(true).toBe(false);
      done();
    });
  });
});

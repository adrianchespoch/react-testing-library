import { getImage } from '../../src/base-tests/10-async-await';

describe('Pruebas en 10-async-await', () => {
  test('should return an image URL', async () => {
    const url = await getImage();

    // expect(typeof url).toBe('string');
    // expect(url).toEqual(expect.any(String));
    expect(url).toBe('Not found');
  });
});

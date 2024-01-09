import { returnSomeArr } from '../../src/base-tests/07-deses-arr';

describe('Pruebas sobre 07-deses-arr.js', () => {
  test('should return an arr', () => {
    const someArr = ['ABC', 123];

    const getArr = returnSomeArr();
    const [letters, numbers] = getArr;

    expect(letters).toBe('ABC');
    expect(numbers).toBe(123);

    expect(getArr).toEqual(someArr);

    // Expect ANY Str
    expect(letters).toEqual(expect.any(String));
  });
});

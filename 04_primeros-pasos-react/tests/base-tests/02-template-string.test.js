import { someText } from '../../src/base-tests/02-template-string';

describe('base test', () => {
  test('should return some string', () => {
    const name = 'Alex';
    const expected = 'Hi ' + name;


    // .toBe()  para primitivos
    expect(someText(name)).toBe(expected);
  });
});

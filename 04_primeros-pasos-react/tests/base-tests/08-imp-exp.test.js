import { getHeroById, getHeroByOwner } from '../../src/base-tests/08-imp-exp';
import heroes from '../../src/data/heroes';

describe('Pruebas en 08-imp-exp.js', () => {
  test('should return an Hero by ID', () => {
    const id = 1;
    const hero = getHeroById(id);

    expect(hero).toEqual({ id: 1, name: 'Batman', owner: 'DC' });
  });

  test('should return undefined if the hero is not found.', () => {
    const id = 999;
    const hero = getHeroById(id);

    expect(hero).toBe(undefined);
    expect(hero).toBeFalsy();
  });

  test("should an array with DC's heroes", () => {
    const owner = 'DC';
    const dcHeroes = getHeroByOwner(owner);

    expect(dcHeroes.length).toBe(3);

    // Hacer esta xq es mas flexible
    expect(dcHeroes).toEqual(heroes.filter(hero => hero.owner === owner));

    // Esta es en duro, no hacer
    expect(dcHeroes).toEqual([
      { id: 1, name: 'Batman', owner: 'DC' },
      { id: 3, name: 'Superman', owner: 'DC' },
      { id: 4, name: 'Flash', owner: 'DC' },
    ]);
  });

  test("should an array with Malrvel's heroes", () => {
    const owner = 'Marvel';
    const marvelHeroues = getHeroByOwner(owner);

    expect(marvelHeroues.length).toBe(2);
    expect(marvelHeroues).toEqual(heroes.filter(hero => hero.owner === owner));

    expect(marvelHeroues).toEqual([
      { id: 2, name: 'Spiderman', owner: 'Marvel' },
      { id: 5, name: 'Wolverine', owner: 'Marvel' },
    ]);
  });
});

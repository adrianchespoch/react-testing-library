import { getHeroById } from './08-imp-exp';

export const getHeroeByIdAsync = id => {
  setTimeout(() => {
    const p1 = getHeroById(id);

    if (p1) resolve(p1);
    else reject('Not found!');
  }, 1200);
};

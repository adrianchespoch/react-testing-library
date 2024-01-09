import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPokemons } from './store/slices/pokemon/thunks';

export const PokemonApp = () => {
  const dispatch = useDispatch();

  // name en el store
  const { isLoading, pokemons, page } = useSelector(state => state.pokemons);

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return (
    <>
      <h1>PokemonApp</h1>
      <hr />

      <span>Loading: {(isLoading && 'True') || 'False'}</span>

      <ul>
        {pokemons.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button onClick={() => dispatch(getPokemons(page))} disabled={isLoading}>
        Next
      </button>
    </>
  );
};

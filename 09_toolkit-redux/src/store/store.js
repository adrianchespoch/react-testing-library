import { configureStore } from '@reduxjs/toolkit';
import { todosApi } from './slices/apis';

import { counterSlice } from './slices/counter';
import { pokemonSlice } from './slices/pokemon';

// store a ser provisto con el Provider  -  State en redux extention
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    pokemons: pokemonSlice.reducer,

    // RTK Query:
    [todosApi.reducerPath]: todosApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(todosApi.middleware),
});

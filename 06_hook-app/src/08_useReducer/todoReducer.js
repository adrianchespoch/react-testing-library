export const todoReducer = (state, action) => {
  switch (action.type) {
    case '[TODO] Add Todo':
      return [...state, action.payload];

    case '[TODO] Remove Todo':
      return state.filter(todo => todo.id !== action.payload);

    case '[TODO] Toggle todo state':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );

    default:
      return state;
  }
};

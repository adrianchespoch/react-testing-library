import { useEffect, useReducer } from 'react';

import { todoReducer } from '../todoReducer';

const initState = [];

const init = () => JSON.parse(localStorage.getItem('todos')) || [];

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, initState, init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = todo => {
    const action = { type: '[TODO] Add Todo', payload: todo };

    dispatch(action);
  };

  const handleRemoveTodo = id => {
    dispatch({ type: '[TODO] Remove Todo', payload: id });
  };

  const handleToggleTodo = id => {
    dispatch({ type: '[TODO] Toggle todo state', payload: id });
  };

  return {
    todos,
    todosCount: todos.length,
    pendingTodosCount: todos.filter(todo => !todo.done).length,
    handleNewTodo,
    handleRemoveTodo,
    handleToggleTodo,
  };
};

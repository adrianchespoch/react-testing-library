import { todoReducer } from '../../src/08_useReducer/todoReducer';

describe('Pruebas en todoReducer', () => {
  const initState = [
    {
      id: 1,
      description: 'Demo Todo',
      done: false,
    },
  ];

  test('debe regresar el initState', () => {
    const newState = todoReducer(initState, {});
    expect(newState).toBe(initState); //Minsmo lugar en memoria
  });

  test('debe agregar 1 todo', () => {
    const action = {
      type: '[TODO] Add Todo',
      payload: { id: 2, description: 'New Todo', done: false },
    };

    const newState = todoReducer(initState, action);

    expect(newState.length).toBe(2);
    expect(newState).toContain(action.payload);
    expect(newState).toEqual([initState[0], action.payload]);
  });

  test('debe eliminar 1 todo', () => {
    const action = {
      type: '[TODO] Remove Todo',
      payload: 1,
    };

    const newState = todoReducer(initState, action);

    expect(newState.length).toBe(0);
  });

  test('debe hacer el toggle del todo', () => {
    const action = {
      type: '[TODO] Toggle todo state',
      payload: 1,
    };

    const newState = todoReducer(initState, action);
    expect(newState[0].done).toBe(true);

    const newState2 = todoReducer(newState, action);
    expect(newState2[0].done).toBe(false);
  });
});

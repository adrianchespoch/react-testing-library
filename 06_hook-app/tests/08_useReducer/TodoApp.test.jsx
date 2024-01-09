import { render, screen } from '@testing-library/react';

import { TodoApp } from '../../src/08_useReducer/TodoApp';
import { useTodos } from '../../src/08_useReducer/hooks/useTodos';

jest.mock('../../src/08_useReducer/hooks/useTodos');

describe('Pruebas en <TodoApp />', () => {
  useTodos.mockReturnValue({
    todos: [
      { id: 1, description: 'Realidad', done: false },
      { id: 2, description: 'Fuerza', done: true },
    ],
    todosCount: 2,
    pendingTodosCount: 1,
    handleNewTodo: jest.fn(),
    handleRemoveTodo: jest.fn(),
    handleToggleTodo: jest.fn(),
  });

  test('debe mostrar el componente correctamanet', () => {
    render(<TodoApp />);

    expect(screen.getByText('Realidad')).toBeTruthy();
    expect(screen.getByText('Fuerza')).toBeTruthy();
    expect(screen.getByRole('textbox')).toBeTruthy(); // input
  });
});

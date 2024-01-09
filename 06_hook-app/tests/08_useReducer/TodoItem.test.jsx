import { fireEvent, render, screen } from '@testing-library/react';
import { TodoItem } from '../../src/08_useReducer/TodoItem';

describe('Pruebas en <TodoItem />', () => {
  const todo = { id: 1, description: 'Realidad', done: false };

  const onDeleteTodoMock = jest.fn();
  const onToggleStateMock = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('', () => {
    render(
      <TodoItem
        {...todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleState={onToggleStateMock}
      />
    );

    const liElement = screen.getByRole('listitem');
    expect(liElement.className).toBe(
      'list-group-item d-flex justify-content-between'
    );

    const spanEl = screen.getByLabelText('span');
    expect(spanEl.className).toContain('align-self-center');
  });

  test('debe renderizar el todo completado', () => {
    todo.done = true;

    render(
      <TodoItem
        {...todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleState={onToggleStateMock}
      />
    );

    const spanEl = screen.getByLabelText('span');
    expect(spanEl.className).toContain('text-decoration-line-through');
  });

  test('span debe llamar el toggleState al hacer click', () => {
    render(
      <TodoItem
        {...todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleState={onToggleStateMock}
      />
    );

    const spanEl = screen.getByLabelText('span');
    fireEvent.click(spanEl);

    expect(onToggleStateMock).toHaveBeenCalled();
    expect(onToggleStateMock).toHaveBeenCalledWith(todo.id);
  });

  test('debe llamar al onDeleteTodo', () => {
    render(
      <TodoItem
        {...todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleState={onToggleStateMock}
      />
    );

    const btnDelete = screen.getByRole('button');
    fireEvent.click(btnDelete);

    expect(onDeleteTodoMock).toHaveBeenCalledWith(todo.id);
  });
});

import { useState } from 'react';
import {
  useGetTodoQuery,
  // useGetTodosQuery,
} from './store/slices/apis/todosApi';

export const TodoApp = () => {
  const [todoId, setTodoId] = useState(1);

  // const { data: todos = [], isLoading } = useGetTodosQuery();
  const { data: todo, isLoading } = useGetTodoQuery(todoId);

  const prevTodo = () => {
    if (todoId <= 1) return;
    setTodoId(todoId - 1);
  };

  return (
    <>
      <h1>Todos - RTK Query</h1>
      <hr />

      <h4>isLoading: {isLoading ? 'True' : 'False'}</h4>

      <pre>{JSON.stringify(todo, null, 3)}</pre>

      <button onClick={prevTodo}>Prev todo</button>
      <button onClick={() => setTodoId(todoId + 1)}>Next todo</button>

      {/* <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <strong>{todo.completed ? 'DONE' : 'Pending'}: </strong>
            {todo.title}
          </li>
        ))}
      </ul> */}
    </>
  );
};

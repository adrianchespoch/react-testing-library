import { useForm } from '../hooks';

export const TodoAdd = ({ onNewTodo }) => {
  const { description, onInputChange, onReset } = useForm({ description: '' });

  const handleSubmit = e => {
    e.preventDefault();
    if (!description.trim()) return;

    onNewTodo({
      id: Math.random() + new Date().getTime(),
      description: description.trim(),
      done: false,
    });

    onReset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What do you want to do?"
        className="form-control"
        name="description"
        value={description}
        onChange={onInputChange}
      />

      <button type="submit" className="btn btn-primary mt-4">
        Agregar
      </button>
    </form>
  );
};

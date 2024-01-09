import { useForm } from '../hooks/useForm';
import { Message } from './Message';

const initState = { username: '', email: '', password: '' };

export const FormWithCustomHook = () => {
  const { username, email, password, onInputChange, onReset } =
    useForm(initState);

  return (
    <>
      <h1>Form with Custom Hook</h1>
      <hr />

      <input
        type="text"
        name="username"
        id="username"
        className="form-control"
        placeholder="Username"
        value={username}
        onChange={onInputChange}
      />

      <input
        type="email"
        name="email"
        placeholder="test@test.com"
        className="form-control mt-3"
        value={email}
        onChange={onInputChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="form-control mt-3"
        value={password}
        onChange={onInputChange}
      />

      <button
        onClick={onReset}
        disabled={(!email || !username || !password) && true}
        className="btn btn-danger form-control mt-4"
      >
        Reset Form
      </button>

      {username === 'alex' && <Message />}
    </>
  );
};

import { useUser } from './hooks/useUser';

export const LoginPage = () => {
  const { user, setUserFx } = useUser();

  const handleLogin = () => {
    setUserFx({ id: 123, name: 'Alex', email: 'alex@test.com' });
  };

  return (
    <>
      <h1>LoginPage</h1>
      <hr />

      <pre aria-label='pre' >{JSON.stringify(user, null, 3)}</pre>

      <button onClick={handleLogin} className="btn btn-primary">
        Set user
      </button>
    </>
  );
};

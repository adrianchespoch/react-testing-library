import { useUser } from './hooks/useUser';

export const HomePage = () => {
  const { user } = useUser();

  return (
    <>
      <h1>
        HomePage <small aria-label="small">{user?.name}</small>
      </h1>
      <hr />

      <pre aria-label="pre">{JSON.stringify(user, null, 3)}</pre>
    </>
  );
};

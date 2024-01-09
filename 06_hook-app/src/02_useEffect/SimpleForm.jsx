import { useEffect, useState } from 'react';
import { Message } from './Message';

export const SimpleForm = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
  });
  const { username, email } = formState;

  const onInputChange = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    // console.log('useEffect called!');
  }, []);
  useEffect(() => {
    // console.log('formState changed!');
  }, [formState]);

  useEffect(() => {
    // console.log('email called!');
  }, [email]);

  useEffect(() => {
    // clean: observables/listener/suscription
    return () => {};
  }, []);

  return (
    <>
      <h1>Simple Form</h1>
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

      {username === 'alex' && <Message />}
    </>
  );
};

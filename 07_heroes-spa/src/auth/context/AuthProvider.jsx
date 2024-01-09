import { useReducer } from 'react';

import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { types } from '../types/types';

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return {
    logged: !!user,
    user: user,
  };
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = name => {
    const user = { id: 1, name };

    localStorage.setItem('user', JSON.stringify(user));

    dispatch({
      type: types.login,
      payload: user,
    });
  };

  const logOut = () => {
    localStorage.removeItem('user');

    dispatch({
      type: types.logout,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

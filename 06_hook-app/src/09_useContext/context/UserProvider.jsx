import { useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const setUserFx = user => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, setUserFx }}>
      {children}
    </UserContext.Provider>
  );
};

import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './context/UserProvider';

import { MainApp } from './MainApp';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <MainApp />
      </UserProvider>
    </BrowserRouter>
  );
};

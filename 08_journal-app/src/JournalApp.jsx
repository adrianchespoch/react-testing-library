import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './router/AppRouter';
import { store } from './store';
import { AppTheme } from './theme/AppTheme';

export const JournalApp = () => {
  return (
    <Provider store={store}>
      <AppTheme>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AppTheme>
    </Provider>
  );
};

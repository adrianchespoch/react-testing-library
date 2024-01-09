import { configureStore } from '@reduxjs/toolkit';

import { uiSlice, calendarSlice, authSlice } from './';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
    auth: authSlice.reducer,
  },

  // Middleware en el store - error serializar la fecha
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

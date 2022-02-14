import { configureStore } from '@reduxjs/toolkit';

import painterReducer from './painter.reducer';

export const store = configureStore({
  reducer: {
    painter: painterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: false
    }
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

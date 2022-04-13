import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth.reducer';
import collectionReducer from '../pages/collection/store';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collection: collectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

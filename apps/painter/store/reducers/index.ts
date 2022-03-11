import { configureStore } from '@reduxjs/toolkit';

import painterReducer from './painter.reducer';
import settingsTabsReducer from './settings-tabs.reducer';

export const store = configureStore({
  reducer: {
    painter: painterReducer,
    settingsTabs: settingsTabsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

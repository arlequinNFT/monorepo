import { configureStore } from '@reduxjs/toolkit';

import arleesModeReducer from '../components/arlees-mode/arlees-mode.reducer';
import backgroundColorReducer from '../components/background-color/background-color.reducer';
import backgroundModeReducer from '../components/background-mode/background-mode.reducer';
import brushColorReducer from '../components/brush-color/brush-color.reducer';
import brushOpacityReducer from '../components/brush-opacity/brush-opacity.reducer';
import brushThicknessReducer from '../components/brush-thickness/brush-thickness.reducer';
import paintingModeReducer from '../components/painting-mode/painting-mode.reducer';
import painterReducer from './reducers/painter.reducer';
import posesListReducer from '../components/poses-list/poses-list.reducer';
import settingsTabsReducer from '../components/settings-tabs/settings-tabs.reducer';
import speciesListReducer from '../components/species-list/species-list.reducer';
import swatchesReducer from '../components/swatches/swatches.reducer';

export const store = configureStore({
  reducer: {
    arleesMode: arleesModeReducer,
    backgroundColor: backgroundColorReducer,
    backgroundMode: backgroundModeReducer,
    brushColor: brushColorReducer,
    brushOpacity: brushOpacityReducer,
    brushThickness: brushThicknessReducer,
    paintingMode: paintingModeReducer,
    painter: painterReducer,
    posesList: posesListReducer,
    settingsTabs: settingsTabsReducer,
    speciesList: speciesListReducer,
    swatches: swatchesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

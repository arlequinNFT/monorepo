import { configureStore } from '@reduxjs/toolkit';

import arleeLight1Reducer from '../components/arlee-light-1/arlee-light-1.reducer';
import arleeLight2Reducer from '../components/arlee-light-2/arlee-light-2.reducer';
import arleeLight3Reducer from '../components/arlee-light-3/arlee-light-3.reducer';
import arleeLightsRotationReducer from '../components/arlee-lights-rotation/arlee-lights-rotation.reducer';
import arleesModeReducer from '../components/arlees-mode/arlees-mode.reducer';
import authReducer from './reducers/auth.reducer';
import backgroundColorReducer from '../components/background-color/background-color.reducer';
import brushColorReducer from '../components/brush-color/brush-color.reducer';
import brushOpacityReducer from '../components/brush-opacity/brush-opacity.reducer';
import brushThicknessReducer from '../components/brush-thickness/brush-thickness.reducer';
import groundColorReducer from '../components/ground-color/ground-color.reducer';
import groundLightColorReducer from '../components/ground-light-color/ground-light-color.reducer';
import groundLightIntensityReducer from '../components/ground-light-intensity/ground-light-intensity.reducer';
import painterReducer from './reducers/ui.reducer';
import paintingModeReducer from '../components/painting-mode/painting-mode.reducer';
import partnersReducer from '../components/partners/partners.reducer';
import posesListReducer from '../components/poses-list/poses-list.reducer';
import settingsTabsReducer from '../components/settings-tabs/settings-tabs.reducer';
import speciesListReducer from '../components/species-list/species-list.reducer';
import stickersReducer from '../components/stickers/stickers.reducer';
import swatchesReducer from '../components/swatches/swatches.reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    arleeLight1: arleeLight1Reducer,
    arleeLight2: arleeLight2Reducer,
    arleeLight3: arleeLight3Reducer,
    arleeLightsRotation: arleeLightsRotationReducer,
    arleesMode: arleesModeReducer,
    backgroundColor: backgroundColorReducer,
    groundColor: groundColorReducer,
    groundLightColor: groundLightColorReducer,
    groundLightIntensity: groundLightIntensityReducer,
    brushColor: brushColorReducer,
    brushOpacity: brushOpacityReducer,
    brushThickness: brushThicknessReducer,
    paintingMode: paintingModeReducer,
    painter: painterReducer,
    partners: partnersReducer,
    posesList: posesListReducer,
    settingsTabs: settingsTabsReducer,
    speciesList: speciesListReducer,
    stickers: stickersReducer,
    swatches: swatchesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

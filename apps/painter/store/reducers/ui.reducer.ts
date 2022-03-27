import { UnityContext } from 'react-unity-webgl';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  sceneLoaded: boolean;
  showLoadingScreen: boolean;
  unityContext: UnityContext;
}

const initialState: State = {
  sceneLoaded: false,
  showLoadingScreen: true,
  unityContext: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    hideLoadingScreen: (state) => {
      state.showLoadingScreen = false;
    },
    setSceneLoaded: (state) => {
      state.sceneLoaded = true;
    },
    setUnityContext: (state, action: PayloadAction<any>) => {
      state.unityContext = action.payload;
    },
  },
});
export const { hideLoadingScreen, setSceneLoaded, setUnityContext } =
  uiSlice.actions;

export default uiSlice.reducer;

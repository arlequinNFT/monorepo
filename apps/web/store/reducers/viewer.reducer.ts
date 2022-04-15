import { UnityContext } from 'react-unity-webgl';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  unityLoaded: boolean;
  showLoadingScreen: boolean;
  unityContext: UnityContext;
}

const initialState: State = {
  unityLoaded: false,
  showLoadingScreen: true,
  unityContext: null,
};

export const uiSlice = createSlice({
  name: 'viewer',
  initialState,
  reducers: {
    hideLoadingScreen: (state) => {
      state.showLoadingScreen = false;
    },
    setUnityLoaded: (state) => {
      state.unityLoaded = true;
    },
    setUnityContext: (state, action: PayloadAction<any>) => {
      state.unityContext = action.payload;
    },
  },
});
export const { hideLoadingScreen, setUnityLoaded, setUnityContext } =
  uiSlice.actions;

export default uiSlice.reducer;

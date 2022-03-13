import { UnityContext } from 'react-unity-webgl';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum BrushType {
  Round = 'Round',
  Square = 'Square',
}

interface State {
  currentBrushType: BrushType;
  currentLightColor: string;
  currentLightIntensity: number;
  currentLightXAxis: number;
  currentLightYAxis: number;
  maxLightIntensity: number;
  maxLightXAxis: number;
  maxLightYAxis: number;
  minLightIntensity: number;
  minLightXAxis: number;
  minLightYAxis: number;
  sceneLoaded: boolean;
  showLoadingScreen: boolean;
  unityContext: UnityContext;
}

const initialState: State = {
  currentBrushType: BrushType.Round,
  currentLightColor: '#ffffff',
  currentLightIntensity: 31,
  currentLightXAxis: 50,
  currentLightYAxis: 225,
  maxLightIntensity: 150,
  maxLightXAxis: 90,
  maxLightYAxis: 360,
  minLightIntensity: 10,
  minLightXAxis: 10,
  minLightYAxis: 1,
  sceneLoaded: false,
  showLoadingScreen: true,
  unityContext: null,
};

export const painterSlice = createSlice({
  name: 'painter',
  initialState,
  reducers: {
    hideLoadingScreen: (state) => {
      state.showLoadingScreen = false;
    },
    setCurrentLightColor: (state, action: PayloadAction<string>) => {
      state.currentLightColor = action.payload;
    },
    setCurrentLightIntensity: (state, action: PayloadAction<number>) => {
      state.currentLightIntensity = action.payload;
    },
    setCurrentLightXAxis: (state, action: PayloadAction<number>) => {
      state.currentLightXAxis = action.payload;
    },
    setCurrentLightYAxis: (state, action: PayloadAction<number>) => {
      state.currentLightYAxis = action.payload;
    },
    setCurrentBrushType: (state, action: PayloadAction<BrushType>) => {
      state.currentBrushType = action.payload;
    },
    setSceneLoaded: (state) => {
      state.sceneLoaded = true;
    },
    setUnityContext: (state, action: PayloadAction<any>) => {
      state.unityContext = action.payload;
    },
  },
});
export const {
  hideLoadingScreen,
  setCurrentBrushType,
  setCurrentLightColor,
  setCurrentLightIntensity,
  setCurrentLightXAxis,
  setCurrentLightYAxis,
  setSceneLoaded,
  setUnityContext,
} = painterSlice.actions;

export default painterSlice.reducer;

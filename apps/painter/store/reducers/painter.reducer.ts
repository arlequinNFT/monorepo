import { UnityContext } from 'react-unity-webgl';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ArleesMode = 'species' | 'poses';
export type ArleesSpecies =
  | 'dog'
  | 'elephant'
  | 'cacatoes'
  | 'pig'
  | 'deer'
  | 'turtle';
export type PaintingMode = 'brush' | 'bucket' | 'eraser' | 'picker';
export type Pose =
  | 'idle'
  | 'run'
  | 'fall'
  | 'stretch'
  | 'look'
  | 'walk'
  | 'jump'
  | 'hello';

export enum BrushType {
  Round = 'Round',
  Square = 'Square',
}

interface Stuff {
  more: string;
}

interface State {
  arlees: ArleesSpecies[];
  cid: string;
  currentArlee: ArleesSpecies | '';
  currentArleesMode: ArleesMode;
  currentBackgroundColor: string;
  currentBrushColor: string;
  currentBrushHardness: number;
  currentBrushOpacity: number;
  currentBrushSize: number;
  currentBrushType: BrushType;
  currentLightColor: string;
  currentLightIntensity: number;
  currentLightXAxis: number;
  currentLightYAxis: number;
  currentPaintingMode: PaintingMode;
  currentPose: Pose;
  isBackgroundEnable: boolean;
  maxBrushHardness: number;
  maxBrushOpacity: number;
  maxBrushSize: number;
  maxLightIntensity: number;
  maxLightXAxis: number;
  maxLightYAxis: number;
  minBrushHardness: number;
  minBrushOpacity: number;
  minBrushSize: number;
  minLightIntensity: number;
  minLightXAxis: number;
  minLightYAxis: number;
  poses: Pose[];
  sceneLoaded: boolean;
  showLoadingScreen: boolean;
  swatches: string[];
  unityContext: UnityContext;
  stuff: Stuff;
}

const initialState: State = {
  arlees: ['cacatoes', 'elephant', 'pig', 'deer', 'turtle'],
  cid: '',
  currentArlee: 'cacatoes',
  currentArleesMode: 'species',
  currentBackgroundColor: '#ffffff',
  currentBrushColor: '#4dd17a',
  currentBrushHardness: 15,
  currentBrushOpacity: 100,
  currentBrushSize: 25,
  currentBrushType: BrushType.Round,
  currentPaintingMode: 'brush',
  currentLightColor: '#ffffff',
  currentLightIntensity: 31,
  currentLightXAxis: 50,
  currentLightYAxis: 225,
  currentPose: 'hello',
  isBackgroundEnable: false,
  maxBrushHardness: 15,
  maxBrushOpacity: 100,
  maxBrushSize: 100,
  maxLightIntensity: 150,
  maxLightXAxis: 90,
  maxLightYAxis: 360,
  minBrushHardness: 2,
  minBrushOpacity: 10,
  minBrushSize: 1,
  minLightIntensity: 10,
  minLightXAxis: 10,
  minLightYAxis: 1,
  poses: ['hello', 'run', 'fall', 'stretch', 'look', 'walk', 'jump'],
  sceneLoaded: false,
  showLoadingScreen: true,
  swatches: [],
  unityContext: null,
  stuff: null,
};

export const painterSlice = createSlice({
  name: 'painter',
  initialState,
  reducers: {
    addColorToSwatches: (state, action: PayloadAction<string>) => {
      if (state.swatches.includes(action.payload) === false) {
        state.swatches.push(action.payload);
      }
    },
    decreaseBrushOpacity: (state) => {
      if (state.currentBrushOpacity > state.minBrushOpacity) {
        state.currentBrushOpacity--;
      }
    },
    decreaseBrushHardness: (state) => {
      if (state.currentBrushHardness > state.minBrushHardness) {
        state.currentBrushHardness--;
      }
    },
    decreaseBrushSize: (state) => {
      if (state.currentBrushSize > state.minBrushSize) {
        state.currentBrushSize--;
      }
    },
    increaseBrushOpacity: (state) => {
      if (state.currentBrushOpacity < state.maxBrushOpacity) {
        state.currentBrushOpacity++;
      }
    },
    increaseBrushHardness: (state) => {
      if (state.currentBrushHardness < state.maxBrushHardness) {
        state.currentBrushHardness++;
      }
    },
    increaseBrushSize: (state) => {
      if (state.currentBrushSize < state.maxBrushSize) {
        state.currentBrushSize++;
      }
    },
    hideLoadingScreen: (state) => {
      state.showLoadingScreen = false;
    },
    setIsBackgroundEnable: (state, action: PayloadAction<boolean>) => {
      state.isBackgroundEnable = action.payload;
    },
    setCid: (state, action: PayloadAction<string>) => {
      state.cid = action.payload;
    },
    setCurrentArlee: (state, action: PayloadAction<ArleesSpecies>) => {
      state.currentArlee = action.payload;
    },
    setCurrentArleesMode: (state, action: PayloadAction<ArleesMode>) => {
      state.currentArleesMode = action.payload;
    },
    setCurrentPose: (state, action: PayloadAction<Pose>) => {
      state.currentPose = action.payload;
    },
    setCurrentBackgroundColor: (state, action: PayloadAction<string>) => {
      state.currentBackgroundColor = action.payload;
    },
    setCurrentBrushColor: (state, action: PayloadAction<string>) => {
      state.currentBrushColor = action.payload;
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
    setCurrentPaintingMode: (state, action: PayloadAction<PaintingMode>) => {
      state.currentPaintingMode = action.payload;
    },
    setCurrentBrushType: (state, action: PayloadAction<BrushType>) => {
      state.currentBrushType = action.payload;
    },
    setCurrentBrushSize: (state, action: PayloadAction<number>) => {
      state.currentBrushSize = action.payload;
    },
    setCurrentBrushOpacity: (state, action: PayloadAction<number>) => {
      state.currentBrushOpacity = action.payload;
    },
    setCurrentBrushHardness: (state, action: PayloadAction<number>) => {
      state.currentBrushHardness = action.payload;
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
  addColorToSwatches,
  decreaseBrushHardness,
  decreaseBrushOpacity,
  decreaseBrushSize,
  hideLoadingScreen,
  increaseBrushHardness,
  increaseBrushOpacity,
  increaseBrushSize,
  setCid,
  setCurrentArlee,
  setCurrentArleesMode,
  setCurrentBackgroundColor,
  setCurrentBrushColor,
  setCurrentBrushHardness,
  setCurrentBrushOpacity,
  setCurrentBrushSize,
  setCurrentBrushType,
  setCurrentLightColor,
  setCurrentLightIntensity,
  setCurrentLightXAxis,
  setCurrentLightYAxis,
  setCurrentPaintingMode,
  setCurrentPose,
  setIsBackgroundEnable,
  setSceneLoaded,
  setUnityContext,
} = painterSlice.actions;

export default painterSlice.reducer;

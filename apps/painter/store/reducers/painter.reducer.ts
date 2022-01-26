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

interface State {
  arlees: ArleesSpecies[];
  cid: string;
  currentArlee: ArleesSpecies | '';
  currentArleesMode: ArleesMode;
  currentBrushColor: string;
  currentBrushHardness: number;
  currentBrushOpacity: number;
  currentBrushSize: number;
  currentBrushType: BrushType;
  currentPaintingMode: PaintingMode;
  currentPose: Pose;
  maxBrushHardness: number;
  maxBrushOpacity: number;
  maxBrushSize: number;
  minBrushHardness: number;
  minBrushOpacity: number;
  minBrushSize: number;
  poses: Pose[];
  sceneLoaded: boolean;
  showLoadingScreen: boolean;
  swatches: string[];
}

const initialState: State = {
  arlees: ['dog', 'cacatoes', 'elephant',  'pig', 'deer', 'turtle'],
  cid: '',
  currentArlee: 'cacatoes',
  currentArleesMode: 'species',
  currentBrushColor: '#4dd17a',
  currentBrushHardness: 5,
  currentBrushOpacity: 50,
  currentBrushSize: 25,
  currentBrushType: BrushType.Round,
  currentPaintingMode: 'brush',
  currentPose: 'hello',
  maxBrushHardness: 10,
  maxBrushOpacity: 100,
  maxBrushSize: 100,
  minBrushHardness: 2,
  minBrushOpacity: 10,
  minBrushSize: 1,
  poses: ['hello', 'run', 'fall', 'stretch', 'look', 'walk', 'jump'],
  sceneLoaded: false,
  showLoadingScreen: true,
  swatches: [],
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
        state.currentBrushOpacity -= 2;
      }
    },
    decreaseBrushHardness: (state) => {
      if (state.currentBrushHardness > state.minBrushHardness) {
        state.currentBrushHardness -= 2;
      }
    },
    decreaseBrushSize: (state) => {
      if (state.currentBrushSize > state.minBrushSize) {
        state.currentBrushSize -= 2;
      }
    },
    increaseBrushOpacity: (state) => {
      if (state.currentBrushOpacity < state.maxBrushOpacity) {
        state.currentBrushOpacity += 2;
      }
    },
    increaseBrushHardness: (state) => {
      if (state.currentBrushHardness < state.maxBrushHardness) {
        state.currentBrushHardness += 2;
      }
    },
    increaseBrushSize: (state) => {
      if (state.currentBrushSize < state.maxBrushSize) {
        state.currentBrushSize += 2;
      }
    },
    hideLoadingScreen: (state) => {
      state.showLoadingScreen = false;
    },
    setPoses: (state, action: PayloadAction<string>) => {
      // state.poses = state.poses.map(pose => ({...pose, }));
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
    setCurrentBrushColor: (state, action: PayloadAction<string>) => {
      state.currentBrushColor = action.payload;
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
  setCurrentBrushColor,
  setCurrentBrushHardness,
  setCurrentBrushOpacity,
  setCurrentBrushSize,
  setCurrentBrushType,
  setCurrentPaintingMode,
  setCurrentPose,
  setSceneLoaded,
} = painterSlice.actions;

export default painterSlice.reducer;

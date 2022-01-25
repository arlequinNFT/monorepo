import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Mode = 'brush' | 'bucket' | 'eraser' | 'picker';
export enum BrushType {
  Round = 'Round',
  Square = 'Square',
}

export interface Arlee {
  species: string;
  image: string;
}

interface State {
  arlees: Arlee[];
  cid: string;
  currentArlee: Arlee;
  currentBrushColor: string;
  currentBrushHardness: number;
  currentBrushOpacity: number;
  currentBrushSize: number;
  currentBrushType: BrushType;
  currentPaintingMode: Mode;
  maxBrushHardness: number;
  maxBrushOpacity: number;
  maxBrushSize: number;
  minBrushHardness: number;
  minBrushOpacity: number;
  minBrushSize: number;
  sceneLoaded: boolean;
  showLoadingScreen: boolean;
  swatches: string[];
}

const initialState: State = {
  arlees: [],
  cid: '',
  currentArlee: {
    image: '',
    species: '',
  },
  currentBrushColor: '#4dd17a',
  currentBrushHardness: 5,
  currentBrushOpacity: 50,
  currentBrushSize: 25,
  currentBrushType: BrushType.Round,
  currentPaintingMode: 'brush',
  maxBrushHardness: 10,
  maxBrushOpacity: 100,
  maxBrushSize: 100,
  minBrushHardness: 2,
  minBrushOpacity: 10,
  minBrushSize: 1,
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
    setArlees: (state, action: PayloadAction<Arlee[]>) => {
      state.arlees = action.payload;
    },
    setCid: (state, action: PayloadAction<string>) => {
      state.cid = action.payload;
    },
    setCurrentArlee: (state, action: PayloadAction<Arlee>) => {
      state.currentArlee = action.payload;
    },
    setCurrentBrushColor: (state, action: PayloadAction<string>) => {
      state.currentBrushColor = action.payload;
    },
    setCurrentPaintingMode: (state, action: PayloadAction<Mode>) => {
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
  decreaseBrushOpacity,
  decreaseBrushHardness,
  decreaseBrushSize,
  hideLoadingScreen,
  increaseBrushOpacity,
  increaseBrushHardness,
  increaseBrushSize,
  setArlees,
  setCid,
  setCurrentArlee,
  setCurrentBrushType,
  setCurrentBrushColor,
  setCurrentPaintingMode,
  setCurrentBrushSize,
  setCurrentBrushOpacity,
  setCurrentBrushHardness,
  setSceneLoaded
} = painterSlice.actions;

export default painterSlice.reducer;

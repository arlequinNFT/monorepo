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
  currentBrushType: BrushType;
  currentColor: string;
  currentMode: Mode;
  defaultSize: number;
  maxSize: number;
  minSize: number;
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
  currentBrushType: BrushType.Round,
  currentColor: '#4dd17a',
  currentMode: 'brush',
  defaultSize: 25,
  maxSize: 100,
  minSize: 1,
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
    hideLoadingScreen: (state) => {
      state.showLoadingScreen = false;
    },
    setCid: (state, action: PayloadAction<string>) => {
      state.cid = action.payload;
    },
    setCurrentcolor: (state, action: PayloadAction<string>) => {
      state.currentColor = action.payload;
    },
    setCurrentArlee: (state, action: PayloadAction<Arlee>) => {
      state.currentArlee = action.payload;
    },
    setCurrentMode: (state, action: PayloadAction<Mode>) => {
      state.currentMode = action.payload;
    },
    setCurrentBrushType: (state, action: PayloadAction<BrushType>) => {
      state.currentBrushType = action.payload;
    },
    setArlees: (state, action: PayloadAction<Arlee[]>) => {
      state.arlees = action.payload;
    },
  },
});

export const {
  addColorToSwatches,
  hideLoadingScreen,
  setCid,
  setCurrentcolor,
  setCurrentBrushType,
  setArlees,
  setCurrentArlee,
  setCurrentMode,
} = painterSlice.actions;

export default painterSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Mode = 'brush' | 'bucket' | 'eraser' | 'picker';
export const enum BrushType {
  Round = 'Round',
  Square = 'Square',
}

export interface Arlee {
  species: string;
  image: string;
}

interface State {
  cid: string;
  currentColor: string;
  currentArlee: Arlee;
  currentMode: Mode;
  currentBrushType: BrushType;
  arlees: Arlee[];
  showLoadingScreen: boolean;
  swatches: string[];
}

const initialState: State = {
  cid: '',
  currentColor: '#4dd17a',
  currentArlee: {
    image: '',
    species: '',
  },
  currentMode: 'brush',
  currentBrushType: BrushType.Round,
  arlees: [],
  showLoadingScreen: true,
  swatches: [
    '#4dd17a',
    '#33c0fd',
    '#8d93ff',
    '#ffba33',
    '#ff8a91',
    '#41b066',
    '#2ba1d5',
    '#9b9dd6',
    '#d69c2b',
    '#d6747a',
    '#dedef2',
  ],
};

export const painterSlice = createSlice({
  name: 'painter',
  initialState,
  reducers: {
    addColorToSwatches: (state, action: PayloadAction<string>) => {
      state.swatches.push(action.payload);
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

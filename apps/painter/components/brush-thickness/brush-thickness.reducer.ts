import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  currentBrushThickness: number;
  maxBrushThickness: number;
  minBrushThickness: number;
}

const initialState: State = {
  currentBrushThickness: 25,
  maxBrushThickness: 100,
  minBrushThickness: 1,
};

export const slice = createSlice({
  name: 'brush-thickness',
  initialState,
  reducers: {
    decreaseBrushThickness: (state) => {
      if (state.currentBrushThickness > state.minBrushThickness) {
        state.currentBrushThickness--;
      }
    },
    increaseBrushThickness: (state) => {
      if (state.currentBrushThickness < state.maxBrushThickness) {
        state.currentBrushThickness++;
      }
    },

    setCurrentBrushThickness: (state, action: PayloadAction<number>) => {
      state.currentBrushThickness = action.payload;
    },
  },
});
export const {
  decreaseBrushThickness,
  increaseBrushThickness,
  setCurrentBrushThickness,
} = slice.actions;

export default slice.reducer;

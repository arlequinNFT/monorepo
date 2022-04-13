import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  currentBrushOpacity: number;
  maxBrushOpacity: number;
  minBrushOpacity: number;
}

const initialState: State = {
  currentBrushOpacity: 100,
  maxBrushOpacity: 100,
  minBrushOpacity: 10,
};

export const slice = createSlice({
  name: 'brush-opacity',
  initialState,
  reducers: {
    decreaseBrushOpacity: (state) => {
      if (state.currentBrushOpacity > state.minBrushOpacity) {
        state.currentBrushOpacity--;
      }
    },

    increaseBrushOpacity: (state) => {
      if (state.currentBrushOpacity < state.maxBrushOpacity) {
        state.currentBrushOpacity++;
      }
    },

    setCurrentBrushOpacity: (state, action: PayloadAction<number>) => {
      state.currentBrushOpacity = action.payload;
    },
  },
});
export const {
  decreaseBrushOpacity,
  increaseBrushOpacity,
  setCurrentBrushOpacity,
} = slice.actions;

export default slice.reducer;

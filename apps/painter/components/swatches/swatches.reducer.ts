import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  swatches: string[];
}

const initialState: State = { swatches: [] };

export const slice = createSlice({
  name: 'poses-list',
  initialState,
  reducers: {
    addColorToSwatches: (state, action: PayloadAction<string>) => {
      if (state.swatches.includes(action.payload) === false) {
        state.swatches.push(action.payload);
      }
    },
  },
});
export const { addColorToSwatches } = slice.actions;

export default slice.reducer;

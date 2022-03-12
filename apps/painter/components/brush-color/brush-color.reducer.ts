import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  currentBrushColor: string;
}

const initialState: State = { currentBrushColor: '#4dd17a' };

export const slice = createSlice({
  name: 'brush-color',
  initialState,
  reducers: {
    setCurrentBrushColor: (state, action: PayloadAction<string>) => {
      state.currentBrushColor = action.payload;
    },
  },
});
export const { setCurrentBrushColor } = slice.actions;

export default slice.reducer;

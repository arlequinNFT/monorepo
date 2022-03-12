import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PaintingMode = 'brush' | 'bucket' | 'picker';

interface State {
  currentPaintingMode: PaintingMode;
}

const initialState: State = { currentPaintingMode: 'brush' };

export const slice = createSlice({
  name: 'painting-mode',
  initialState,
  reducers: {
    setCurrentPaintingMode: (state, action: PayloadAction<PaintingMode>) => {
      state.currentPaintingMode = action.payload;
    },
  },
});
export const { setCurrentPaintingMode } = slice.actions;

export default slice.reducer;

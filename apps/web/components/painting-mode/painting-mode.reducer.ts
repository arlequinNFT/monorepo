import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PaintingMode = 'brush' | 'bucket' | 'picker' | 'sticker';
export type BrushDecal = 'hard' | 'soft';

interface State {
  currentBrushDecal: 'hard' | 'soft';
  currentPaintingMode: PaintingMode;
}

const initialState: State = {
  currentPaintingMode: 'brush',
  currentBrushDecal: 'hard',
};

export const slice = createSlice({
  name: 'painting-mode',
  initialState,
  reducers: {
    setCurrentPaintingMode: (state, action: PayloadAction<PaintingMode>) => {
      state.currentPaintingMode = action.payload;
    },
    setCurrentBrushDecal: (state, action: PayloadAction<BrushDecal>) => {
      state.currentBrushDecal = action.payload;
    },
  },
});
export const { setCurrentPaintingMode, setCurrentBrushDecal } = slice.actions;

export default slice.reducer;

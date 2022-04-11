import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Sticker {
  name: string;
  base64: string;
}

interface StickersGroup {
  stickers: Sticker[];
  name: string;
}

interface State {
  stickersGroup: StickersGroup[];

  stickerAngle: number;
  stickerSize: number;
  maxStickerSize: number;
  minStickerSize: number;
}

const initialState: State = {
  stickersGroup: [],
  stickerAngle: 0,
  stickerSize: 34,
  minStickerSize: 10,
  maxStickerSize: 100,
};

export const slice = createSlice({
  name: 'stickers',
  initialState,
  reducers: {
    setStickersGroup: (
      state,
      {
        payload: { name, stickers },
      }: PayloadAction<{ name: string; stickers: Sticker[] }>
    ) => {
      state.stickersGroup.push({ name, stickers });
    },
    decreaseStickerSize: (state) => {
      if (state.stickerSize > state.minStickerSize) {
        state.stickerSize -= 5;
      }
    },
    increaseStickerSize: (state) => {
      if (state.stickerSize < state.maxStickerSize) {
        state.stickerSize += 5;
      }
    },

    decreaseStickerAngle: (state) => {
      state.stickerAngle -= 5;
    },
    increaseStickerAngle: (state) => {
      state.stickerAngle += 5;
    },
  },
});
export const {
  decreaseStickerAngle,
  decreaseStickerSize,
  increaseStickerAngle,
  increaseStickerSize,
  setStickersGroup,
} = slice.actions;

export default slice.reducer;

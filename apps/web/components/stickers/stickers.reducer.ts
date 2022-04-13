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
  arlequinStickersGroup: StickersGroup[];
  partnersStickersGroup: StickersGroup[];

  stickerAngle: number;
  stickerSize: number;
  maxStickerSize: number;
  minStickerSize: number;
}

const initialState: State = {
  arlequinStickersGroup: [],
  partnersStickersGroup: [],
  stickerAngle: 0,
  stickerSize: 34,
  minStickerSize: 10,
  maxStickerSize: 100,
};

export const slice = createSlice({
  name: 'stickers',
  initialState,
  reducers: {
    setArlequinStickersGroup: (
      state,
      {
        payload: { name, stickers },
      }: PayloadAction<{ name: string; stickers: Sticker[] }>
    ) => {
      state.arlequinStickersGroup.push({ name, stickers });
    },
    setPartnersStickersGroup: (
      state,
      {
        payload: { name, stickers },
      }: PayloadAction<{ name: string; stickers: Sticker[] }>
    ) => {
      state.partnersStickersGroup.push({ name, stickers });
    },
    emptyPartnersStickersGroup: (state) => {
      state.partnersStickersGroup = [];
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
  setArlequinStickersGroup,
  setPartnersStickersGroup,
  emptyPartnersStickersGroup,
} = slice.actions;

export default slice.reducer;

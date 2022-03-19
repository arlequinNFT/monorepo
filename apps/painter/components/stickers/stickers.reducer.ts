import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  activeSticker: string;
  stickerSize: number;
  minStickerSize: number;
  maxStickerSize: number;
  stickerAngle: number;
}

const initialState: State = {
  activeSticker: '',
  stickerSize: 34,
  minStickerSize: 10,
  maxStickerSize: 100,
  stickerAngle: 0,
};

export const slice = createSlice({
  name: 'stickers',
  initialState,
  reducers: {
    setActiveSticker: (state, action: PayloadAction<string>) => {
      state.activeSticker = action.payload;
    },

    decreaseStickerSize: (state) => {
      if (state.stickerSize > state.minStickerSize) {
        state.stickerSize -= 2;
      }
    },
    increaseStickerSize: (state) => {
      if (state.stickerSize < state.maxStickerSize) {
        state.stickerSize += 2;
      }
    },

    decreaseStickerAngle: (state) => {
      state.stickerAngle -= 2;
    },
    increaseStickerAngle: (state) => {
      state.stickerAngle += 2;
    },
  },
});
export const {
  setActiveSticker,
  decreaseStickerAngle,
  decreaseStickerSize,
  increaseStickerAngle,
  increaseStickerSize,
} = slice.actions;

export default slice.reducer;

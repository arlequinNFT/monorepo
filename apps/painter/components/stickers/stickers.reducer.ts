import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StickerGroup {
  title: string;
  list: { name: string; base64: string }[];
}

interface State {
  activeSticker: string;
  stickerSize: number;
  minStickerSize: number;
  maxStickerSize: number;
  stickerAngle: number;
  stickersGroupList: StickerGroup[];
}

const initialState: State = {
  activeSticker: '',
  stickerSize: 34,
  minStickerSize: 10,
  maxStickerSize: 100,
  stickerAngle: 0,
  stickersGroupList: [
    {
      title: 'Emotions',
      list: [
        {
          name: 'emotion_1',
          base64:
            'data:image/webp;base64,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',
        },
        {
          name: 'stuff',
          base64:
            'data:image/png;base64,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',
        },
        // 'emotion_3a',
        // 'emotion_4',
        // 'emotion_5',
        // 'emotion_6',
      ],
    },
  ],
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
  setActiveSticker,
  decreaseStickerAngle,
  decreaseStickerSize,
  increaseStickerAngle,
  increaseStickerSize,
} = slice.actions;

export default slice.reducer;

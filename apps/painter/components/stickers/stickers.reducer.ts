import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  bandaid_1,
  bandaid_2,
  emotion_1,
  emotion_2,
  emotion_3,
  emotion_4,
  emotion_5,
  emotion_6,
  heart_1,
  heart_2,
  lol_1,
  lol_2,
  lol_3,
  lol_4,
  lol_5,
  star_1,
  star_2,
} from './stickers';

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
          base64: emotion_1,
        },
        {
          name: 'emotion_2',
          base64: emotion_2,
        },
        {
          name: 'emotion_3',
          base64: emotion_3,
        },
        {
          name: 'emotion_4',
          base64: emotion_4,
        },
        {
          name: 'emotion_5',
          base64: emotion_5,
        },
        {
          name: 'emotion_6',
          base64: emotion_6,
        },
      ],
    },
    {
      title: 'Hearts',
      list: [
        {
          name: 'heart_1',
          base64: heart_1,
        },
        {
          name: 'heart_2',
          base64: heart_2,
        },
      ],
    },
    {
      title: 'Stars',
      list: [
        {
          name: 'star_1',
          base64: star_1,
        },

        {
          name: 'lol_1',
          base64: lol_1,
        },
        {
          name: 'lol_2',
          base64: lol_2,
        },
        {
          name: 'lol_3',
          base64: lol_3,
        },
        {
          name: 'lol_4',
          base64: lol_4,
        },
        {
          name: 'lol_5',
          base64: lol_5,
        },
        {
          name: 'star_2',
          base64: star_2,
        },
      ],
    },
    {
      title: 'Bandaids',
      list: [
        {
          name: 'bandaid_1',
          base64: bandaid_1,
        },
        {
          name: 'bandaid_2',
          base64: bandaid_2,
        },
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

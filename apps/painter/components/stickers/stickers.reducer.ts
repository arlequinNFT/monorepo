import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StickerGroup {
  title: string;
  path: string;
  list: string[];
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
      path: 'emotions',
      list: [
        'emotion_1',
        'emotion_2',
        'emotion_3a',
        'emotion_3b',
        'emotion_4',
        'emotion_5',
        'emotion_6',
      ],
    },
    {
      title: 'Nature',
      path: 'nature',
      list: [
        'nature_1',
        'nature_2',
        'nature_3',
        'nature_4',
        'nature_5',
        'nature_6',
        'nature_7',
        'nature_8',
      ],
    },
    {
      title: 'Hearts',
      path: 'hearts',
      list: ['heart_1', 'heart_2', 'heart_3', 'heart_4', 'heart_5'],
    },
    {
      title: 'Stars',
      path: 'stars',
      list: ['star_1', 'star_2', 'star_3', 'star_4', 'star_5', 'star_6'],
    },
    {
      title: 'Bandaids',
      path: 'bandaids',
      list: ['bandaid_1', 'bandaid_2', 'bandaid_3', 'bandaid_4'],
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

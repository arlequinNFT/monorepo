import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StickerGroup {
  name?: string;
  title: string;
  path: string;
  list: string[];
  enabled?: boolean;
}

interface State {
  arlequinStickersGroupList: StickerGroup[];
  partnersStickersGroupList: StickerGroup[];

  stickerAngle: number;
  stickerSize: number;
  maxStickerSize: number;
  minStickerSize: number;
}

const initialState: State = {
  arlequinStickersGroupList: [
    {
      title: 'Emotions',
      path: 'emotions',
      list: [
        'emotion_1',
        'emotion_2',
        'emotion_3',
        'emotion_4',
        'emotion_5',
        'emotion_6',
      ],
    },
    {
      title: 'Symbols',
      path: 'stars',
      list: ['heart_1', 'heart_2', 'star_1', 'star_2'],
    },
    {
      title: 'Misc',
      path: 'misc',
      list: ['bandaid_1', 'bandaid_2'],
    },
  ],
  partnersStickersGroupList: [
    {
      name: 'byc',
      title: 'Barter Yard Club',
      path: 'partners/byc',
      list: ['werewolf'],
      enabled: false,
    },
    {
      name: 'piggos',
      title: 'CryptoPiggos',
      path: 'partners/piggos',
      list: ['piggos-1', 'piggos-2'],
      enabled: false,
    },
  ],
  stickerAngle: 0,
  stickerSize: 34,
  minStickerSize: 10,
  maxStickerSize: 100,
};

export const slice = createSlice({
  name: 'stickers',
  initialState,
  reducers: {
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

    enablePartner: (state, action: PayloadAction<{ partnerName: string }>) => {
      state.partnersStickersGroupList.find(
        (p) => p.name === action.payload.partnerName
      ).enabled = true;
    },
  },
});
export const {
  decreaseStickerAngle,
  decreaseStickerSize,
  increaseStickerAngle,
  increaseStickerSize,
  enablePartner,
} = slice.actions;

export default slice.reducer;

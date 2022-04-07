import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StickerGroup {
  title: string;
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
      list: ['heart_1', 'heart_2', 'star_1', 'star_2'],
    },
    {
      title: 'Misc',
      list: ['bandaid_1', 'bandaid_2'],
    },
  ],
  partnersStickersGroupList: [
    {
      title: 'Barter Yard Club',
      list: ['werewolf'],
      enabled: false,
    },
    {
      title: 'CryptoPiggos',
      list: ['piggos-1', 'piggos-2'],
      enabled: false,
    },
    {
      title: 'ZeedZ',
      list: ['zeedz-1', 'zeedz-2'],
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
        (p) => p.title === action.payload.partnerName
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

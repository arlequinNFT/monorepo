import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  byc_1,
  emotion_1,
  emotion_2,
  emotion_3,
  emotion_4,
  emotion_5,
  emotion_6,
  piggos_1,
  piggos_2,
  zeedz_1,
  zeedz_2,
} from './stickers';

interface StickerGroup {
  enabled?: boolean;
  list: { name: string; base64: string }[];
  title: string;
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
  ],
  partnersStickersGroupList: [
    {
      title: 'Barter Yard Club',
      list: [
        {
          name: 'byc_1',
          base64: byc_1,
        },
      ],
      enabled: false,
    },
    {
      title: 'CryptoPiggos',
      list: [
        {
          name: 'piggos_1',
          base64: piggos_1,
        },
        {
          name: 'piggos_2',
          base64: piggos_2,
        },
      ],
      enabled: false,
    },
    {
      title: 'ZeedZ',
      list: [
        {
          name: 'zeedz_1',
          base64: zeedz_1,
        },
        {
          name: 'zeedz_2',
          base64: zeedz_2,
        },
      ],
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Partner {
  title: string;
  image: string;
  enabled: boolean;
}

interface State {
  list: Partner[];
}

const initialState: State = {
  list: [
    {
      title: 'Barter Yard Club',
      image: '',
      enabled: false,
    },
    {
      title: 'CryptoPiggos',
      image: '',
      enabled: false,
    },
    {
      title: 'ZeedZ',
      image: '',
      enabled: false,
    },
  ],
};

export const slice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    enablePartner: (state, action: PayloadAction<{ partnerName: string }>) => {
      state.list.find((p) => p.title === action.payload.partnerName).enabled =
        true;
    },
  },
});
export const { enablePartner } = slice.actions;

export default slice.reducer;

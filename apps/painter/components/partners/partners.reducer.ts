import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Partner {
  name: string;
  description: string;
  image: string;
  enabled: boolean;
}

interface State {
  list: Partner[];
}

const initialState: State = {
  list: [
    {
      name: 'byc',
      description: 'Get the werewolf inside of you!',
      image: '',
      enabled: false,
    },
    {
      name: 'piggos',
      description: 'Some cute piggos!',
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
      state.list.find((p) => p.name === action.payload.partnerName).enabled =
        true;
    },
  },
});
export const { enablePartner } = slice.actions;

export default slice.reducer;

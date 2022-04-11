import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Partner {
  name: string;
  enabled: boolean;
}

interface State {
  list: Partner[];
}

const initialState: State = {
  list: [],
};

export const slice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    enablePartner: (state, action: PayloadAction<{ partnerName: string }>) => {
      state.list.find((p) => p.name === action.payload.partnerName).enabled =
        true;
    },
    setAllPartners: (state, action: PayloadAction<{ allPartners: any }>) => {
      state.list = Object.keys(action.payload.allPartners).map((partner) => ({
        name: partner,
        enabled: false,
      }));
    },
  },
});
export const { enablePartner, setAllPartners } = slice.actions;

export default slice.reducer;

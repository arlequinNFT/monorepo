import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Partner {
  name: string;
  enabled: boolean;
}

interface State {
  list: Partner[];
  allPartnersLoaded: boolean;
  userPartnersLoaded: boolean;
}

const initialState: State = {
  list: [],
  allPartnersLoaded: false,
  userPartnersLoaded: false,
};

export const slice = createSlice({
  name: 'partners',
  initialState,
  reducers: {
    enablePartner: (state, action: PayloadAction<{ partnerName: string }>) => {
      state.list.find((p) => p.name === action.payload.partnerName).enabled =
        true;
    },
    disableAllPartners: (state) => {
      state.list = state.list.map((p) => ({ ...p, enabled: false }));
    },
    setAllPartners: (state, action: PayloadAction<{ allPartners: any }>) => {
      state.list = Object.keys(action.payload.allPartners).map((partner) => ({
        name: partner,
        enabled: false,
      }));
    },
    setAllPartnersLoaded: (state) => {
      state.allPartnersLoaded = true;
    },
    setUserPartnersLoaded: (state) => {
      state.userPartnersLoaded = true;
    },
  },
});
export const {
  enablePartner,
  setAllPartners,
  setAllPartnersLoaded,
  setUserPartnersLoaded,
  disableAllPartners,
} = slice.actions;

export default slice.reducer;

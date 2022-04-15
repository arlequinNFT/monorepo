import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  loaded: boolean;
  entries: any[];
}

const initialState: State = {
  loaded: false,
  entries: [],
};

export const uiSlice = createSlice({
  name: 'entries',
  initialState,
  reducers: {
    setEntries: (state, action: PayloadAction<any[]>) => {
      state.entries = action.payload;
    },
  },
});
export const { setEntries } = uiSlice.actions;

export default uiSlice.reducer;

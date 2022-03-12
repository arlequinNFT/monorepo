import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  currentBackgroundColor: string;
}

const initialState: State = { currentBackgroundColor: '#ffffff' };

export const slice = createSlice({
  name: 'background-color',
  initialState,
  reducers: {
    setCurrentBackgroundColor: (state, action: PayloadAction<string>) => {
      state.currentBackgroundColor = action.payload;
    },
  },
});
export const { setCurrentBackgroundColor } = slice.actions;

export default slice.reducer;

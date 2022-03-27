import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  color: string;
}

const initialState: State = { color: '#ffffff' };

export const slice = createSlice({
  name: 'ground-light-color',
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
});
export const { setColor } = slice.actions;

export default slice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  image: string;
}

const initialState: State = { image: '' };

export const slice = createSlice({
  name: 'mint',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
  },
});
export const { setImage } = slice.actions;

export default slice.reducer;

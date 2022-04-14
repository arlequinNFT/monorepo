import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  thumbnail: string;
}

const initialState: State = { thumbnail: '' };

export const slice = createSlice({
  name: 'mint',
  initialState,
  reducers: {
    setThumbnail: (state, action: PayloadAction<string>) => {
      state.thumbnail = action.payload;
    },
  },
});
export const { setThumbnail } = slice.actions;

export default slice.reducer;

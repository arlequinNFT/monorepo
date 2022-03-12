import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ArleesMode = 'species' | 'poses';

interface State {
  currentArleesMode: ArleesMode;
}

const initialState: State = { currentArleesMode: 'species' };

export const slice = createSlice({
  name: 'arlees-mode',
  initialState,
  reducers: {
    setCurrentArleesMode: (state, action: PayloadAction<ArleesMode>) => {
      state.currentArleesMode = action.payload;
    },
  },
});
export const { setCurrentArleesMode } = slice.actions;

export default slice.reducer;

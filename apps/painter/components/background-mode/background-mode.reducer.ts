import { createSlice } from '@reduxjs/toolkit';

interface State {
  currentBackgroundMode: '3d' | 'flat';
}

const initialState: State = { currentBackgroundMode: 'flat' };

export const slice = createSlice({
  name: 'background-mode',
  initialState,
  reducers: {
    setBackgroundModeTo3D: (state) => {
      state.currentBackgroundMode = '3d';
    },
    setBackgroundModeToFlat: (state) => {
      state.currentBackgroundMode = 'flat';
    },
  },
});
export const { setBackgroundModeTo3D, setBackgroundModeToFlat } = slice.actions;

export default slice.reducer;

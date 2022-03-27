import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  intensity: number;
  min: number;
  max: number;
}

const initialState: State = { intensity: 2, min: 0, max: 10 };

export const slice = createSlice({
  name: 'ground-light-intensity',
  initialState,
  reducers: {
    setIntensity: (state, action: PayloadAction<number>) => {
      state.intensity = action.payload;
    },
  },
});
export const { setIntensity } = slice.actions;

export default slice.reducer;

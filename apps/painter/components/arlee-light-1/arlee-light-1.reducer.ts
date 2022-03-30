import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  intensity: number;
  min: number;
  max: number;
  color: string;
}

const initialState: State = {
  intensity: 27,
  min: 0,
  max: 50,
  color: '#ffffff',
};

export const slice = createSlice({
  name: 'arlee-light-1',
  initialState,
  reducers: {
    setIntensity: (state, action: PayloadAction<number>) => {
      state.intensity = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
  },
});
export const { setIntensity, setColor } = slice.actions;

export default slice.reducer;

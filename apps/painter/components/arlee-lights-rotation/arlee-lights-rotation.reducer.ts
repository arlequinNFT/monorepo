import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  xRotation: number;
  xMin: number;
  xMax: number;
  yRotation: number;
  yMin: number;
  yMax: number;
}

const initialState: State = {
  xRotation: 0,
  xMin: 0,
  xMax: 360,
  yRotation: 0,
  yMin: 0,
  yMax: 360,
};

export const slice = createSlice({
  name: 'arlee-lights-rotation',
  initialState,
  reducers: {
    setXRotation: (state, action: PayloadAction<number>) => {
      state.xRotation = action.payload;
    },
    setYRotation: (state, action: PayloadAction<number>) => {
      state.yRotation = action.payload;
    },
  },
});
export const { setXRotation, setYRotation } = slice.actions;

export default slice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Pose =
  | 'idle'
  | 'run'
  | 'fall'
  | 'stretch'
  | 'look'
  | 'walk'
  | 'jump'
  | 'hello';

interface State {
  currentPose: Pose;
  poses: Pose[];
}

const initialState: State = {
  currentPose: 'hello',
  poses: ['hello', 'run', 'fall', 'stretch', 'look', 'walk', 'jump'],
};

export const slice = createSlice({
  name: 'poses-list',
  initialState,
  reducers: {
    setCurrentPose: (state, action: PayloadAction<Pose>) => {
      state.currentPose = action.payload;
    },
  },
});
export const { setCurrentPose } = slice.actions;

export default slice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  withContestParticipation: boolean;
  price: number;
}

const initialState: State = { withContestParticipation: false, price: 10 };

export const slice = createSlice({
  name: 'mint',
  initialState,
  reducers: {
    setWithContestParticipation: (state, action: PayloadAction<boolean>) => {
      state.withContestParticipation = action.payload;
    },
  },
});
export const { setWithContestParticipation } = slice.actions;

export default slice.reducer;

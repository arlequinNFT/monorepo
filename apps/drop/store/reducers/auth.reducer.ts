
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User  {
  addr: string;
  cid: string;
  loggedIn: boolean;
}

interface State {
  currentUser: User | null;
}

const initialState: State = {
  currentUser: null,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    unauthenticate: (state) => {
      state.currentUser = null;
    },
  },
});
export const { setCurrentUser } = slice.actions;

export default slice.reducer;

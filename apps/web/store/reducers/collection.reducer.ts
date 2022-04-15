import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Arlee {
  description: string;
  cid: string;
}

interface State {
  arleesCollection: Arlee[];
}

const initialState: State = {
  arleesCollection: [],
};

export const slice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setArleesCollection: (state, action: PayloadAction<Arlee[]>) => {
      state.arleesCollection = action.payload;
    },
    emptyArleesCollection: (state) => {
      state.arleesCollection = [];
    },
  },
});
export const { setArleesCollection, emptyArleesCollection } = slice.actions;

export default slice.reducer;

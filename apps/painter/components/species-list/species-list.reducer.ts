import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ArleesSpecies =
  | 'dog'
  | 'elephant'
  | 'cacatoes'
  | 'pig'
  | 'deer'
  | 'turtle';

interface State {
  arlees: ArleesSpecies[];
  currentArlee: ArleesSpecies | '';
}

const initialState: State = {
  arlees: ['cacatoes', 'elephant', 'pig', 'deer', 'turtle'],
  currentArlee: 'cacatoes',
};

export const slice = createSlice({
  name: 'species-list',
  initialState,
  reducers: {
    setCurrentArlee: (state, action: PayloadAction<ArleesSpecies>) => {
      state.currentArlee = action.payload;
    },
  },
});
export const { setCurrentArlee } = slice.actions;

export default slice.reducer;

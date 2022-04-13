import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Response {
  status: number;
  statusCode: number;
}

interface State {
  response: Response;
}

const initialState: State = {
  response: {
    status: 0,
    statusCode: 0,
  },
};

export const slice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionStatus: (state, action: PayloadAction<Response>) => {
      state.response.status = action.payload.status;
      state.response.statusCode = action.payload.statusCode;
    },
  },
});
export const { setTransactionStatus } = slice.actions;

export default slice.reducer;

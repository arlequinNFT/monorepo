import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  swatches: ColorPayload[];
}

const initialState: State = {
  swatches: [
    // {
    //   color: '#ffffff',
    //   currentBrushThickness: null,
    //   currentBrushOpacity: null,
    // },
    // {
    //   color: '#c3c3c3',
    //   currentBrushThickness: null,
    //   currentBrushOpacity: null,
    // },
    // {
    //   color: '#585858',
    //   currentBrushThickness: null,
    //   currentBrushOpacity: null,
    // },
    // {
    //   color: '#000000',
    //   currentBrushThickness: null,
    //   currentBrushOpacity: null,
    // },
    // {
    //   color: '#88001b',
    //   currentBrushThickness: null,
    //   currentBrushOpacity: null,
    // },
    // {
    //   color: '#ec1c24',
    //   currentBrushThickness: null,
    //   currentBrushOpacity: null,
    // },
    // {
    //   color: '#ff7f27',
    //   currentBrushThickness: null,
    //   currentBrushOpacity: null,
    // },
    // {
    //   color: '#ffca18',
    //   currentBrushThickness: null,
    //   currentBrushOpacity: null,
    // },
    // {
    //   color: '#fff200',
    //   currentBrushThickness: null,
    //   currentBrushOpacity: null,
    // },
    // {
    //   color: '#c4ff0e',
    //   currentBrushThickness: null,
    //   currentBrushOpacity: null,
    // },
    // {
    //   color: '#0ed145',
    //   currentBrushThickness: null,
    //   currentBrushOpacity: null,
    // },
    // {
    //   color: '#8cfffb',
    //   currentBrushThickness: null,
    //   currentBrushOpacity: null,
    // },
  ],
};

export interface ColorPayload {
  color: string;
  currentBrushOpacity: number | null;
  currentBrushThickness: number | null;
}

export const slice = createSlice({
  name: 'swatches',
  initialState,
  reducers: {
    addColorToSwatches: (state, action: PayloadAction<ColorPayload>) => {
      if (state.swatches.every((i) => i.color !== action.payload.color)) {
        state.swatches.push(action.payload);
      }
    },
  },
});
export const { addColorToSwatches } = slice.actions;

export default slice.reducer;

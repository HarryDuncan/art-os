import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defaultState } from './Context';

const slice = createSlice({
  name: 'digitalArt',
  initialState: defaultState,
  reducers: {
    selectPiece: (state, { payload }: PayloadAction<number>) => {
      state.selectedToViewIndex = payload;
    },
  },
});

export const {
  reducer,
  actions: { selectPiece },
} = slice;

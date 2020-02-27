import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FloorSpace } from './types';
import { Identity } from '../common/types';

const factorySlice = createSlice({
  name: 'factory',
  initialState: {
    id: { uuid: 'default', name: 'space1' },
    xLength: 4,
    yLength: 4
  } as FloorSpace,
  reducers: {
    setIdentity(state, action: PayloadAction<Identity>) {
      state.id = action.payload;
    },
    setXLength(state, action: PayloadAction<number>) {
      state.xLength = action.payload;
    },
    setYLength(state, action: PayloadAction<number>) {
      state.yLength = action.payload;
    }
  }
});

export const { setIdentity, setXLength, setYLength } = factorySlice.actions;

export const factoryReducer = factorySlice.reducer;

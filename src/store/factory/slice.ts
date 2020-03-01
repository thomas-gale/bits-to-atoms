import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Factory } from './types';
import { Identity } from '../common/types';
import { createExistingIdentity } from '../common/factoryMethods';

const factorySlice = createSlice({
  name: 'factory',
  initialState: {
    id: createExistingIdentity('Factory', 'factory-default'),
    floorSpace: {
      id: createExistingIdentity('Floorspace', 'floorspace-default'),
      xLength: 4,
      yLength: 4
    }
  } as Factory,
  reducers: {
    setIdentity(state, action: PayloadAction<Identity>) {
      state.id = action.payload;
    },
    setFloorSpaceXLength(state, action: PayloadAction<number>) {
      state.floorSpace.xLength = action.payload;
    },
    setFloorSpaceYLength(state, action: PayloadAction<number>) {
      state.floorSpace.yLength = action.payload;
    }
  }
});

export const {
  setIdentity,
  setFloorSpaceXLength,
  setFloorSpaceYLength
} = factorySlice.actions;

export const factoryReducer = factorySlice.reducer;

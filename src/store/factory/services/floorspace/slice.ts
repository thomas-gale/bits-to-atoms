import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FloorSpace } from './types';
import { createExistingIdentity } from '../../../common/typeFactoryMethods';

const floorSpaceSlice = createSlice({
  name: 'floorspace',
  initialState: {
    id: createExistingIdentity('Floorspace', 'floorspace-default'),
    xLength: 4,
    yLength: 4
  } as FloorSpace,
  reducers: {
    setXLength(state, action: PayloadAction<number>) {
      state.xLength = action.payload;
    },
    setYLength(state, action: PayloadAction<number>) {
      state.yLength = action.payload;
    }
  }
});

export const { setXLength, setYLength } = floorSpaceSlice.actions;

export const floorSpaceReducer = floorSpaceSlice.reducer;

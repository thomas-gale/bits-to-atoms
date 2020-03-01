import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { Factory } from './types';
import { Identity } from '../common/types';
import { createExistingIdentity } from '../common/typeFactoryMethods';
import { floorSpaceReducer } from './services/floorspace/slice';

const factorySlice = createSlice({
  name: 'factory',
  initialState: {
    id: createExistingIdentity('Factory', 'factory-default')
  } as Factory,
  reducers: {
    setIdentity(state, action: PayloadAction<Identity>) {
      state.id = action.payload;
    }
  }
});

export const { setIdentity } = factorySlice.actions;

export const factoryReducer = factorySlice.reducer;

export const factoryServicesReducer = combineReducers({
  floorSpace: floorSpaceReducer
});

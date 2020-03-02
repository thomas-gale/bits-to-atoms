import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { Factory } from './types';
import { Identity } from '../common/types';
import { factoryServicesReducer } from './services/slice';
import { createExistingIdentity } from '../common/factories';

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

export const factoryReducer = combineReducers({
  stats: factorySlice.reducer,
  services: factoryServicesReducer
});

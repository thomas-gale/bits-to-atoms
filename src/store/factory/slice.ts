import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { Identity } from '../common/primitive/types';
import { createFactory } from './factories';

const factorySlice = createSlice({
  name: 'factory',
  initialState: createFactory(),
  reducers: {
    setIdentity(state, action: PayloadAction<Identity>) {
      state.id = action.payload;
    }
  }
});

export const { setIdentity } = factorySlice.actions;

export const factoryReducer = factorySlice.reducer;

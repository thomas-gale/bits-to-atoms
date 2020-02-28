import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuildRequest } from './types';
import { Identity } from '../common/types';

const marketSlice = createSlice({
  name: 'market',
  initialState: [] as BuildRequest[],
  reducers: {
    addBuildRequest(state, action: PayloadAction<BuildRequest>) {
      state.push(action.payload);
    },
    removeBuildRequest(state, action: PayloadAction<Identity>) {
      const indexToRemove = state.findIndex(
        el => el.identity.uuid === action.payload.uuid
      );
      if (indexToRemove === -1) {
        return; // Don't do anything if we can't find that element
      }
      state.splice(indexToRemove, 1); // Remove the element that has a matching index.
    }
  }
});

export const { addBuildRequest, removeBuildRequest } = marketSlice.actions;

export const marketReducer = marketSlice.reducer;

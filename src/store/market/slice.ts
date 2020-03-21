import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuildRequest } from '../buildrequest/types';
import { Market } from './types';

const marketSlice = createSlice({
  name: 'market',
  initialState: {
    visible: true,
    buildRequests: []
  } as Market,
  reducers: {
    requestBidBuildRequest(_state, _action: PayloadAction<BuildRequest>) {
      // This action is picked up by middlewear saga for verification first.
    },
    addBuildRequest(state, action: PayloadAction<BuildRequest>) {
      state.buildRequests.push(action.payload);
    },
    removeBuildRequest(state, action: PayloadAction<string>) {
      const indexToRemove = state.buildRequests.findIndex(
        el => el.id === action.payload
      );
      if (indexToRemove === -1) {
        console.error(`Unable to remove build request ${action.payload}`);
        return; // Don't do anything if we can't find that element
      }
      state.buildRequests.splice(indexToRemove, 1); // Remove the element that has a matching index.
    }
  }
});

export const {
  requestBidBuildRequest,
  addBuildRequest,
  removeBuildRequest
} = marketSlice.actions;

export const marketReducer = marketSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Market } from './types';
import { BuildRequest } from '../buildrequest/types';
import { Identity } from '../common/identity/types';

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
    removeBuildRequest(state, action: PayloadAction<Identity>) {
      const indexToRemove = state.buildRequests.findIndex(
        el => el.identity.uuid === action.payload.uuid
      );
      if (indexToRemove === -1) {
        console.error(`Unable to remove build request ${action.payload.uuid}`);
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuildRequest, Market } from './types';
import { Identity } from '../common/identity/types';

const marketSlice = createSlice({
  name: 'market',
  initialState: {
    visible: true,
    buildRequests: []
  } as Market,
  reducers: {
    setVisible(state, action: PayloadAction<boolean>) {
      state.visible = action.payload;
    },
    toggleVisible(state, _: PayloadAction) {
      state.visible = !state.visible;
    },
    addBuildRequest(state, action: PayloadAction<BuildRequest>) {
      state.buildRequests.push(action.payload);
    },
    removeBuildRequest(state, action: PayloadAction<Identity>) {
      const indexToRemove = state.buildRequests.findIndex(
        el => el.identity.uuid === action.payload.uuid
      );
      if (indexToRemove === -1) {
        return; // Don't do anything if we can't find that element
      }
      state.buildRequests.splice(indexToRemove, 1); // Remove the element that has a matching index.
    }
  }
});

export const {
  setVisible,
  toggleVisible,
  addBuildRequest,
  removeBuildRequest
} = marketSlice.actions;

export const marketReducer = marketSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createExistingIdentity } from '../common/identity/factories';
import { Identity } from '../common/identity/types';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    selectedServiceProviderId: {}
  },
  reducers: {
    unSelect(state, action: PayloadAction) {
      state.selectedServiceProviderId = {};
    },
    setSelected(state, action: PayloadAction<Identity>) {
      state.selectedServiceProviderId = action.payload;
    }
  }
});

export const { unSelect, setSelected } = selectedSlice.actions;

export const selectedReducer = selectedSlice.reducer;

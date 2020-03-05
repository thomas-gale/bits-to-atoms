import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createExistingIdentity } from '../common/identity/factories';
import { Identity } from '../common/identity/types';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    selectedServiceProviderId: createExistingIdentity('', '')
  },
  reducers: {
    setSelected(state, action: PayloadAction<Identity>) {
      console.log(`Set Selected in Slice Id ${action.payload}`);
      state.selectedServiceProviderId = action.payload;
      console.log(`State updated: ${state.selectedServiceProviderId}`);
    }
  }
});

export const { setSelected } = selectedSlice.actions;

export const selectedReducer = selectedSlice.reducer;

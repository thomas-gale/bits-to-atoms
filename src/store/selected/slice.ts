import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Identity } from '../common/identity/types';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    selectedServiceProviderId: {}
  },
  reducers: {
    unSelect(state, _: PayloadAction) {
      state.selectedServiceProviderId = {};
    },
    setSelected(state, action: PayloadAction<Identity>) {
      state.selectedServiceProviderId = action.payload;
    }
  }
});

export const { unSelect, setSelected } = selectedSlice.actions;

export const selectedReducer = selectedSlice.reducer;

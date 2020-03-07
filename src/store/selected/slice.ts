import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Identity } from '../common/identity/types';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    selectedServiceProviderId: undefined as Identity | undefined
  },
  reducers: {
    unSelect(state, _: PayloadAction) {
      state.selectedServiceProviderId = undefined;
    },
    setSelected(state, action: PayloadAction<Identity>) {
      state.selectedServiceProviderId = action.payload;
    }
  }
});

export const { unSelect, setSelected } = selectedSlice.actions;

export const selectedReducer = selectedSlice.reducer;

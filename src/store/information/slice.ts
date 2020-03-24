import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const informationSlice = createSlice({
  name: 'information',
  initialState: {
    informationOverlayVisible: false,
  },
  reducers: {
    showInformationOverlay(state, _: PayloadAction) {
      state.informationOverlayVisible = true;
    },
    hideInformationOverlay(state, _: PayloadAction) {
      state.informationOverlayVisible = false;
    },
  },
});

export const {
  showInformationOverlay,
  hideInformationOverlay,
} = informationSlice.actions;

export const informationReducer = informationSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MarketFactoryPanelVisibilty } from './types';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    marketFactoryPanelVisibilty: MarketFactoryPanelVisibilty.Market,
    primaryFocusBuildRequestId: undefined as string | undefined,
    selectedServiceProviderId: undefined as string | undefined
  },
  reducers: {
    setMarketFactoryPanelVisibilty(
      state,
      action: PayloadAction<MarketFactoryPanelVisibilty>
    ) {
      state.marketFactoryPanelVisibilty = action.payload;
    },
    unSelectPrimaryFocusBuildRequest(state, _: PayloadAction) {
      state.primaryFocusBuildRequestId = undefined;
    },
    setSelectedPrimaryFocusBuildRequest(state, action: PayloadAction<string>) {
      state.primaryFocusBuildRequestId = action.payload;
    },
    unSelectServiceProvider(state, _: PayloadAction) {
      state.selectedServiceProviderId = undefined;
    },
    setSelectedServiceProvider(state, action: PayloadAction<string>) {
      state.selectedServiceProviderId = action.payload;
    }
  }
});

export const {
  setMarketFactoryPanelVisibilty,
  unSelectPrimaryFocusBuildRequest,
  setSelectedPrimaryFocusBuildRequest,
  unSelectServiceProvider,
  setSelectedServiceProvider
} = selectedSlice.actions;

export const selectedReducer = selectedSlice.reducer;

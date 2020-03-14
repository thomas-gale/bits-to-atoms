import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Identity } from '../common/identity/types';
import { MarketFactoryPanelVisibilty } from './types';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    marketFactoryPanelVisibilty: MarketFactoryPanelVisibilty.Market,
    primaryFocusBuildRequestId: undefined as Identity | undefined,
    selectedServiceProviderId: undefined as Identity | undefined
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
    setSelectedPrimaryFocusBuildRequest(
      state,
      action: PayloadAction<Identity>
    ) {
      state.primaryFocusBuildRequestId = action.payload;
    },
    unSelectServiceProvider(state, _: PayloadAction) {
      state.selectedServiceProviderId = undefined;
    },
    setSelectedServiceProvider(state, action: PayloadAction<Identity>) {
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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Identity } from '../common/identity/types';
import { MarketFactoryPanelVisibilty } from './types';

const selectedSlice = createSlice({
  name: 'selected',
  initialState: {
    marketFactoryPanelVisibilty: MarketFactoryPanelVisibilty.None,
    selectedServiceProviderId: undefined as Identity | undefined
  },
  reducers: {
    setMarketFactoryPanelVisibilty(
      state,
      action: PayloadAction<MarketFactoryPanelVisibilty>
    ) {
      state.marketFactoryPanelVisibilty = action.payload;
    },
    unSelect(state, _: PayloadAction) {
      state.selectedServiceProviderId = undefined;
    },
    setSelected(state, action: PayloadAction<Identity>) {
      state.selectedServiceProviderId = action.payload;
    }
  }
});

export const {
  setMarketFactoryPanelVisibilty,
  unSelect,
  setSelected
} = selectedSlice.actions;

export const selectedReducer = selectedSlice.reducer;

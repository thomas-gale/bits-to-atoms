import { RootState } from '..';
import { marketFactoryPanelVisibiltySelector } from './selectors';
import { MarketFactoryPanelVisibilty } from './types';

// Initial State
const baseStoreInitialState = {
  selected: {
    marketFactoryPanelVisibilty: MarketFactoryPanelVisibilty.Market,
    primaryFocusBuildRequestId: undefined as string | undefined,
    selectedServiceProviderId: undefined as string | undefined
  }
} as RootState;

describe('selected selectors', () => {
  it('should return the market panel visiblity as Market', () => {
    expect(marketFactoryPanelVisibiltySelector(baseStoreInitialState)).toEqual(
      MarketFactoryPanelVisibilty.Market
    );
  });
});

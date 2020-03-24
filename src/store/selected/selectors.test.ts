import { RootState } from '..';
import {
  marketFactoryPanelVisibiltySelector,
  primaryFocusBuildRequestIdSelector,
} from './selectors';
import { MarketFactoryPanelVisibilty } from './types';

// Initial State
const baseStoreInitialState = {
  selected: {
    marketFactoryPanelVisibilty: MarketFactoryPanelVisibilty.Market,
    primaryFocusBuildRequestId: undefined as string | undefined,
    selectedServiceProviderId: undefined as string | undefined,
  },
} as RootState;

describe('selected selectors', () => {
  it('should return the market panel visiblity as Market', () => {
    expect(marketFactoryPanelVisibiltySelector(baseStoreInitialState)).toEqual(
      MarketFactoryPanelVisibilty.Market
    );
  });
  it('should return the primary focus build request Id', () => {
    const testPrimaryFocusBuildRequestId =
      'test-primary-focus-build-request-id';
    const initialState = {
      ...baseStoreInitialState,
      selected: {
        ...baseStoreInitialState.selected,
        primaryFocusBuildRequestId: testPrimaryFocusBuildRequestId,
      },
    };
    expect(primaryFocusBuildRequestIdSelector(initialState)).toEqual(
      testPrimaryFocusBuildRequestId
    );
  });
});

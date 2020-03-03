import { createSelector } from 'reselect';
import { RootState } from '../index';
import { Market } from './types';

export const marketSelector = (state: RootState) => state.market;

export const marketVisibleSelector = createSelector(
  [marketSelector],
  (market: Market) => {
    return market.visible;
  }
);

export const buildRequestsSelector = createSelector(
  [marketSelector],
  (market: Market) => {
    return market.buildRequests;
  }
);

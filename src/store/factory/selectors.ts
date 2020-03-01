import { createSelector } from 'reselect';
import { RootState } from '../index';
import { Factory, FloorSpace } from './types';

export const factorySelector = (state: RootState) => state.factory;

export const floorSpaceSelector = createSelector(
  [factorySelector],
  (factory: Factory): FloorSpace => {
    return factory.floorSpace;
  }
);
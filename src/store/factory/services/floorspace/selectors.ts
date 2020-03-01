import { createSelector } from 'reselect';
import { Factory } from '../../types';
import { FloorSpace } from './types';
import { factorySelector } from '../../selectors';

export const floorSpaceSelector = createSelector(
  [factorySelector],
  (factory: Factory): FloorSpace => {
    return factory.floorSpace;
  }
);

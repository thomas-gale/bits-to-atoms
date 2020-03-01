//import { createSelector } from 'reselect';
//import { Factory } from '../../types';
//import { FloorSpace } from './types';
import { RootState } from '../../..';
//import { factorySelector } from '../../selectors';

export const floorSpaceSelector = (state: RootState) =>
  state.factoryServices.floorSpace;

/*createSelector(
  [factorySelector],
  (factory: Factory): FloorSpace => {
    return factory.floorSpace;
  }
);*/

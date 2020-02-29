import { createSelector } from 'reselect';
import { RootState } from '../index';
import { Factory, FloorSpace, FloorspaceParmeters } from './types';

export const factorySelector = (state: RootState) => state.factory;

export const floorSpaceSelector = createSelector(
  [factorySelector],
  (factory: Factory) => {
    return factory.floorSpace;
  }
);

export const floorSpaceFormParametersSelector = createSelector(
  [floorSpaceSelector],
  (floorSpace: FloorSpace): FloorspaceParmeters => {
    return {
      idtestlengthx: floorSpace.xLength,
      idtestlengthy: floorSpace.yLength
    };
  }
);

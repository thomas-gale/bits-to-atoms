import { createSelector } from 'reselect';
import { RootState } from '../index';
import { Selected } from './types';

export const selectedSelector = (state: RootState) => state.selected;

/*export const floorSpaceParametersSelector = createSelector(
  [selectedSelector],
  (selected: Selected):  => {
    return factory.floorSpace;
  }
);*/

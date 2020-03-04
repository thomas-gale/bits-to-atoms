/*import { createSelector } from 'reselect';
import { RootState } from '../index';
import { ServiceProvider } from '../factory/services/types';
import { Parameter, ParameterType } from './types';
import {
  createNewIdentity,
  createExistingIdentity
} from '../common/primitive/factories';

export const selectedSelector = (state: RootState) => state.selected;

export const getParametersSelector = createSelector(
  [selectedSelector],
  (selected: ServiceProvider): Parameter[] => {
    return [
      {
        identity: createExistingIdentity('PositionX', 'PositionX'),
        type: ParameterType.NUMBER,
        value: selected.location.x.toString()
      }
    ];
  }
);*/

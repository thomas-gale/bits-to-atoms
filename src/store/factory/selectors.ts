import { createSelector } from 'reselect';
import { RootState } from '../index';
import { Factory } from './slice';

export const factorySelector = (state: RootState) => state.factory;

export const factoryServicesSelector = createSelector(
  [factorySelector],
  (factory: Factory) => {
    return factory.services;
  }
);

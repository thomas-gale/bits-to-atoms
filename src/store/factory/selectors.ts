import { createSelector } from 'reselect';
import { RootState } from '../index';
import { Factory } from './types';

export const factorySelector = (state: RootState) => state.factory;

export const factoryServicesSelector = createSelector(
  [factorySelector],
  (factory: Factory) => {
    return factory.serviceProviders;
  }
);

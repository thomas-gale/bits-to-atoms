import { combineReducers } from '@reduxjs/toolkit';
import { floorSpaceReducer } from './floorspace/slice';

export const factoryServicesReducer = combineReducers({
  floorSpace: floorSpaceReducer
});

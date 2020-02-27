import { combineReducers } from '@reduxjs/toolkit'
import { marketReducer } from './market/slice';

export const rootReducer = combineReducers({marketReducer})
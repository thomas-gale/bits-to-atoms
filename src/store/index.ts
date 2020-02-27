import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { marketReducer } from './market/slice';
import { factoryReducer } from './factory/slice';

export const rootReducer = combineReducers({
  market: marketReducer, 
  factory: factoryReducer 
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;

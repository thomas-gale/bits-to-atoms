import { createSlice, PayloadAction, combineReducers } from '@reduxjs/toolkit';
import { Identity } from '../common/primitive/types';
import { factoryServicesReducer } from './services/slice';
import { createEntity } from './factories';
import { createNewIdentity } from '../common/primitive/factories';

const factoryEntitySlice = createSlice({
  name: 'factory',
  initialState: createEntity(createNewIdentity('default-factory')),
  reducers: {
    setIdentity(state, action: PayloadAction<Identity>) {
      state.id = action.payload;
    }
  }
});

export const { setIdentity } = factoryEntitySlice.actions;

export const factoryReducer = combineReducers({
  entity: factoryEntitySlice.reducer,
  services: factoryServicesReducer
});

export type Factory = ReturnType<typeof factoryReducer>;

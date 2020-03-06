import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Identity } from '../common/identity/types';
import { createFactory } from './factories';
import {
  Parameter,
  //ParameterType,
  NumberParameter
} from '../common/parameter/types';
//import { selectedServiceProviderIdSelector } from '../selected/selectors';

const factorySlice = createSlice({
  name: 'factory',
  initialState: createFactory(),
  reducers: {
    setIdentity(state, action: PayloadAction<Identity>) {
      state.identity = action.payload;
    },
    setServiceProviderParameter(
      state,
      action: PayloadAction<{
        serviceProviderId: Identity;
        parameter: NumberParameter;
      }>
    ) {
      // Get the associated service provider from the application state.
      const serviceProvider = state.serviceProviders.find(
        sp => sp.id.uuid === action.payload.serviceProviderId.uuid
      );
      if (!serviceProvider) return;


      // Split the parameter identity value up.

      // All Parameter types are number
      serviceProvider.location[action.payload.parameter.identity.uuid] =
        action.payload.parameter.value;
    }
  }
});

export const {
  setIdentity,
  setServiceProviderParameter
} = factorySlice.actions;

export const factoryReducer = factorySlice.reducer;

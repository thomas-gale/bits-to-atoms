import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Identity } from '../common/identity/types';
import { createFactory } from './factories';
import {
  //Parameter,
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
        serviceProviderProperty: string[];
        parameter: NumberParameter;
      }>
    ) {
      // Get the associated service provider from the application state.
      const serviceProvider = state.serviceProviders.find(
        sp => sp.id.uuid === action.payload.serviceProviderId.uuid
      );
      if (!serviceProvider) return;

      // Make assumption that serviceProviderProperty are 1 or 2 layers deep.
      // TODO: Replace this with a recursive structure.
      if (action.payload.serviceProviderProperty.length === 1) {
        serviceProvider[action.payload.serviceProviderProperty[0]] =
          action.payload.parameter.value;
      } else if (action.payload.serviceProviderProperty.length === 2) {
        serviceProvider[action.payload.serviceProviderProperty[0]][
          action.payload.serviceProviderProperty[1]
        ] = action.payload.parameter.value;
      }
    }
  }
});

export const {
  setIdentity,
  setServiceProviderParameter
} = factorySlice.actions;

export const factoryReducer = factorySlice.reducer;

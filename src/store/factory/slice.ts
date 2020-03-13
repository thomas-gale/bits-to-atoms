import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Identity } from '../common/identity/types';
import { createFactory } from './factories';
import { Parameter } from '../common/parameter/types';
import { BuildRequest } from '../buildrequest/types';
import { LiquidAsset } from '../economic/types';
import { Workflow } from '../workflow/types';

const factorySlice = createSlice({
  name: 'factory',
  initialState: createFactory(),
  reducers: {
    setIdentity(state, action: PayloadAction<Identity>) {
      state.identity = action.payload;
    },
    setLiquidAsset(state, action: PayloadAction<LiquidAsset>) {
      state.liquidAsset = action.payload;
    },
    updateActiveBuildRequestWorkflow(
      state,
      action: PayloadAction<{ buildRequestId: Identity; workflow: Workflow }>
    ) {
      const activeBuildRequestIndex = state.activeBuildRequests.findIndex(
        br => br.identity.uuid === action.payload.buildRequestId.uuid
      );
      if (activeBuildRequestIndex === -1) return;

      state.activeBuildRequests[activeBuildRequestIndex].workflow =
        action.payload.workflow;
    },
    addActiveBuildRequest(state, action: PayloadAction<BuildRequest>) {
      state.activeBuildRequests.push(action.payload);
    },
    setServiceProviderParameter(
      state,
      action: PayloadAction<{
        serviceProviderId: Identity;
        serviceProviderProperty: string[];
        parameter: Parameter;
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
      } else {
        console.error(
          'Unable to setServiceProviderParameter (serviceProviderProperty array unexpected depth)'
        );
      }
    }
  }
});

export const {
  setIdentity,
  setLiquidAsset,
  updateActiveBuildRequestWorkflow,
  addActiveBuildRequest,
  setServiceProviderParameter
} = factorySlice.actions;

export const factoryReducer = factorySlice.reducer;

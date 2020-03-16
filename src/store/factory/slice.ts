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
    removeActiveBuildRequest(state, action: PayloadAction<Identity>) {
      const indexToRemove = state.activeBuildRequests.findIndex(
        br => br.identity.uuid === action.payload.uuid
      );
      if (indexToRemove === -1) {
        console.error(
          `Unable to remove active build request ${action.payload.uuid}`
        );
        return; // Don't do anything if we can't find that element
      }
      state.activeBuildRequests.splice(indexToRemove, 1); // Remove the element that has a matching index.
    },
    addOpenActivity(state, action: PayloadAction<Identity>) {
      state.openActivities.push(action.payload);
    },
    removeOpenActivity(state, action: PayloadAction<Identity>) {
      const indexToRemove = state.openActivities.findIndex(
        a => a.uuid === action.payload.uuid
      );
      if (indexToRemove === -1) {
        console.error(`Unable to remove open activity ${action.payload.uuid}`);
        return; // Don't do anything if we can't find that element
      }
      state.openActivities.splice(indexToRemove, 1); // Remove the element that has a matching index.
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
  removeActiveBuildRequest,
  addOpenActivity,
  removeOpenActivity,
  setServiceProviderParameter
} = factorySlice.actions;

export const factoryReducer = factorySlice.reducer;

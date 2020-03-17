import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Identity } from '../common/identity/types';
import { createFactory } from './factories';
import { Parameter } from '../common/parameter/types';
import { BuildRequest } from '../buildrequest/types';
import { LiquidAsset } from '../economic/types';
import { Workflow, Activity } from '../workflow/types';

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
    addActiveBuildRequest(state, action: PayloadAction<BuildRequest>) {
      state.activeBuildRequests.push(action.payload);
    },
    updateActiveBuildRequestWorkflow(
      state,
      action: PayloadAction<{ buildRequestId: Identity; workflow: Workflow }>
    ) {
      const activeBuildRequestIndex = state.activeBuildRequests.findIndex(
        br => br.identity.uuid === action.payload.buildRequestId.uuid
      );
      if (activeBuildRequestIndex === -1) {
        console.error(
          `Unable to update active build request workflow, build request ${action.payload.buildRequestId} not found`
        );
        return;
      }

      state.activeBuildRequests[activeBuildRequestIndex].workflow =
        action.payload.workflow;
    },
    updateActiveBuildRequestActivity(
      state,
      action: PayloadAction<{ buildRequestId: Identity; activity: Activity }>
    ) {
      const activeBuildRequestIndex = state.activeBuildRequests.findIndex(
        br => br.identity.uuid === action.payload.buildRequestId.uuid
      );
      if (activeBuildRequestIndex === -1) {
        console.error(
          `Unable to update active build request activity, build request ${action.payload.buildRequestId} not found`
        );
        return;
      }

      const currentWorkflow =
        state.activeBuildRequests[activeBuildRequestIndex].workflow;

      if (!currentWorkflow) {
        console.error(
          `Unable to update active build request (${action.payload.buildRequestId}) activity, build request workflow undefined`
        );
        return;
      }

      const activeBuildRequestActivityIndex = currentWorkflow.activities.findIndex(
        a => a.identity.uuid === action.payload.activity.identity.uuid
      );

      if (!currentWorkflow.activities[activeBuildRequestActivityIndex]) {
        console.error(
          `Unable to update active build request (${action.payload.buildRequestId}) activity, the workflow activity ${action.payload.activity.identity.uuid} not found`
        );
        return;
      }

      // Successfully update the activity.
      currentWorkflow.activities[activeBuildRequestActivityIndex] =
        action.payload.activity;
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
    requestUpdateOpenActivity(_state, _action: PayloadAction<Activity>) {
      // This action is picked up by middlewear saga for processing first.
      // This is normally trigged by a service provider assigning itself (possibly appending an estimated cost quote)
    },
    updateOpenActivity(state, action: PayloadAction<Activity>) {
      const indexToUpdate = state.openActivities.findIndex(
        a => a.uuid === action.payload.identity.uuid
      );
      if (indexToUpdate === -1) {
        console.error(
          `Unable to find to update open activity ${action.payload.identity.uuid}`
        );
        return; // Don't do anything if we can't find that element
      }

      // TD. The following steps show that we need to think carefully about this structure, maybe try to better normalise it.
      // We need to search through each active build request trying to match up the workflow.
      for (const activeBuildRequest of state.activeBuildRequests) {
        if (activeBuildRequest.workflow) {
          for (let activity of activeBuildRequest.workflow.activities) {
            if (activity.identity.uuid === action.payload.identity.uuid) {
              activity = action.payload;
              return;
            }
          }
        }
      }
      console.error(
        `Unable to find to update open activity ${action.payload.identity.uuid}`
      );
    },
    removeOpenActivity(state, action: PayloadAction<Identity>) {
      const indexToRemove = state.openActivities.findIndex(
        a => a.uuid === action.payload.uuid
      );
      if (indexToRemove === -1) {
        console.error(
          `Unable to find to remove open activity ${action.payload.uuid}`
        );
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
  addActiveBuildRequest,
  updateActiveBuildRequestWorkflow,
  updateActiveBuildRequestActivity,
  removeActiveBuildRequest,
  addOpenActivity,
  removeOpenActivity,
  setServiceProviderParameter
} = factorySlice.actions;

export const factoryReducer = factorySlice.reducer;

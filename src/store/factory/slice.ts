import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Identity } from '../common/identity/types';
import { createFactory } from './factories';
import { Parameter } from '../common/parameter/types';
import { BuildRequest } from '../buildrequest/types';
import { LiquidAsset } from '../economic/types';
import { Workflow, Activity } from '../workflow/types';
import { ServiceProvider } from './services/types';

const factorySlice = createSlice({
  name: 'factory',
  initialState: createFactory(),
  reducers: {
    setDisplayName(state, action: PayloadAction<string>) {
      state.displayName = action.payload;
    },
    setLiquidAsset(state, action: PayloadAction<LiquidAsset>) {
      state.liquidAsset = action.payload;
    },
    addActiveBuildRequest(state, action: PayloadAction<BuildRequest>) {
      state.buildRequests.push(action.payload);
    },
    updateActiveBuildRequestWorkflow(
      state,
      action: PayloadAction<{ buildRequestId: Identity; workflow: Workflow }>
    ) {
      const activeBuildRequestIndex = state.buildRequests.findIndex(
        br => br.identity.id === action.payload.buildRequestId.id
      );
      if (activeBuildRequestIndex === -1) {
        console.error(
          `Unable to update active build request workflow, build request ${action.payload.buildRequestId} not found`
        );
        return;
      }

      state.buildRequests[activeBuildRequestIndex].workflow =
        action.payload.workflow;
    },
    requestFullfillmentOfActivity(_state, _action: PayloadAction<Activity>) {
      // This action is to be picked up by middlewear saga for processing.
      // This is trigged by the initial step in the Factory build request execution workflow
      // From the primary factory saga.
    },
    offerFullfillmentOfActivity(
      _state,
      _action: PayloadAction<{
        serviceProvider: ServiceProvider;
        activity: Activity;
      }>
    ) {
      // This action is to be picked up by middlewear saga for processing.
      // This is trigged by the second step in the Factory build request execution workflow
      // From the service providers returning 'quotes' of how to execute the activity.
    },
    acceptFullfillmentOfActivity(
      _state,
      _action: PayloadAction<{
        serviceProvider: ServiceProvider;
        activity: Activity;
      }>
    ) {
      // This action is to be picked up by middlewear saga for processing.
      // This is trigged by the third step in the Factory build request execution workflow
      // From the primary factory saga to confirm that the service provider can go ahead and begin excution.
    },
    updateActiveBuildRequestActivity(
      state,
      action: PayloadAction<{ buildRequestId: Identity; activity: Activity }>
    ) {
      const activeBuildRequestIndex = state.buildRequests.findIndex(
        br => br.identity.id === action.payload.buildRequestId.id
      );
      if (activeBuildRequestIndex === -1) {
        console.error(
          `Unable to update active build request activity, build request ${action.payload.buildRequestId} not found`
        );
        return;
      }

      const currentWorkflow =
        state.buildRequests[activeBuildRequestIndex].workflow;

      if (!currentWorkflow) {
        console.error(
          `Unable to update active build request (${action.payload.buildRequestId}) activity, build request workflow undefined`
        );
        return;
      }

      const activeBuildRequestActivityIndex = currentWorkflow.activities.findIndex(
        a => a.identity.id === action.payload.activity.identity.id
      );

      if (!currentWorkflow.activities[activeBuildRequestActivityIndex]) {
        console.error(
          `Unable to update active build request (${action.payload.buildRequestId}) activity, the workflow activity ${action.payload.activity.identity.id} not found`
        );
        return;
      }

      // Successfully update the activity.
      currentWorkflow.activities[activeBuildRequestActivityIndex] =
        action.payload.activity;
    },
    removeActiveBuildRequest(state, action: PayloadAction<Identity>) {
      const indexToRemove = state.buildRequests.findIndex(
        br => br.identity.id === action.payload.id
      );
      if (indexToRemove === -1) {
        console.error(
          `Unable to remove active build request ${action.payload.id}`
        );
        return; // Don't do anything if we can't find that element
      }
      state.buildRequests.splice(indexToRemove, 1); // Remove the element that has a matching index.
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
        sp => sp.id.id === action.payload.serviceProviderId.id
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
  setDisplayName,
  setLiquidAsset,
  addActiveBuildRequest,
  updateActiveBuildRequestWorkflow,
  requestFullfillmentOfActivity,
  offerFullfillmentOfActivity,
  acceptFullfillmentOfActivity,
  updateActiveBuildRequestActivity,
  removeActiveBuildRequest,
  setServiceProviderParameter
} = factorySlice.actions;

export const factoryReducer = factorySlice.reducer;

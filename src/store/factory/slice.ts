import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import { factorySchema, workflowSchema, activitySchema } from './schemas';

import { BuildRequest } from '../buildrequest/types';
import { Parameter } from '../common/parameter/types';
import { Activity, Workflow } from '../workflow/types';
import { createFactory } from './factories';
import { ServiceProvider } from './services/types';

const factorySlice = createSlice({
  name: 'factory',
  initialState: normalize(createFactory(), factorySchema),
  reducers: {
    setDisplayName(state, action: PayloadAction<string>) {
      state.result.displayName = action.payload;
    },
    setLiquidAssetDollars(state, action: PayloadAction<number>) {
      state.entities = {
        ...state.entities,
        assets: {
          ...state.entities.assets,
          [state.result.liquidAsset]: {
            ...(state.entities.assets
              ? state.entities.assets[state.result.liquidAsset]
              : {}),
            dollars: action.payload
          }
        }
      };
    },
    addBuildRequest(state, action: PayloadAction<BuildRequest>) {
      state.entities = {
        ...state.entities,
        buildRequests: {
          ...state.entities.buildRequests,
          [action.payload.id]: action.payload
        }
      };
      state.result = {
        ...state.result,
        buildRequests: [...state.result.buildRequests, action.payload.id]
      };
    },
    updateBuildRequestWorkflow(
      state,
      action: PayloadAction<{ buildRequestId: string; workflow: Workflow }>
    ) {
      const normalizedWorkflow = normalize(
        action.payload.workflow,
        workflowSchema
      );
      state.entities = {
        ...state.entities,
        ...normalizedWorkflow.entities
      };
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
    updateActivity(state, action: PayloadAction<Activity>) {
      const normalizedActivity = normalize(
        action.payload,
        activitySchema
      );
      state.entities = {
        ...state.entities,
        ...normalizedActivity.entities
      };
    },
    removeBuildRequest(state, action: PayloadAction<string>) {
      //
      console.error('Not Implemented');
      /*
      const indexToRemove = state.buildRequests.findIndex(
        br => br.id === action.payload
      );
      if (indexToRemove === -1) {
        console.error(
          `Unable to remove active build request ${action.payload}`
        );
        return; // Don't do anything if we can't find that element
      }
      state.buildRequests.splice(indexToRemove, 1); // Remove the element that has a matching index.*/
    },
    setServiceProviderParameter(
      state,
      action: PayloadAction<{
        serviceProviderId: string;
        serviceProviderProperty: string[];
        parameter: Parameter;
      }>
    ) {
      if (
        state.entities.serviceProviders &&
        action.payload.serviceProviderId in state.entities.serviceProviders
      ) {
        //state.entities.activities[action.payload.id] = action.payload;

        const serviceProvider =
          state.entities.serviceProviders[action.payload.serviceProviderId];

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
      } else {
        console.error(
          `Unable to update service provider parameter, service provider ${action.payload.serviceProviderId} not found`
        );
      }
      /*

      // Get the associated service provider from the application state.
      const serviceProvider = state.entities.serviceProviders.find(
        sp => sp.id === action.payload.serviceProviderId
      );
      if (!serviceProvider) return;*/
    }
  }
});

export const {
  setDisplayName,
  setLiquidAssetDollars,
  addBuildRequest,
  updateBuildRequestWorkflow,
  requestFullfillmentOfActivity,
  offerFullfillmentOfActivity,
  acceptFullfillmentOfActivity,
  updateActivity,
  removeBuildRequest,
  setServiceProviderParameter
} = factorySlice.actions;

export const factoryReducer = factorySlice.reducer;

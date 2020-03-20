import { delay, takeEvery, select, put, take } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { BuildRequest } from '../buildrequest/types';
import {
  addActiveBuildRequest,
  setLiquidAsset,
  updateActiveBuildRequestWorkflow,
  requestFullfillmentOfActivity,
  offerFullfillmentOfActivity,
  acceptFullfillmentOfActivity
} from './slice';
import { config } from '../../env/config';
import {
  factoryLiquidAssetSelector,
  currentServiceProviderCostPerTimeSelector,
  factoryServiceProvidersSelector
} from './selectors';
import { LiquidAsset } from '../economic/types';
import { createLiquidAsset } from '../economic/factories';
import {
  createWorkflow,
  createTransmutationActivity,
  createTransportationActivity
} from '../workflow/factories';
import { createNewIdentity } from '../common/identity/factories';
import { BasicShape } from '../common/topology/types';
import { MaterialType } from '../material/types';
import {
  Activity,
  TransmutationActivity,
  TransmutationStateType
} from '../workflow/types';
import { ServiceProvider } from './services/types';
import {
  createBasicShapeTransmutationState,
  createLiquidAssetTransmutationState
} from './services/factories';

export function* factoryUpdateTickSaga() {
  const updateDelayMs = config.factory.updatePeriodMs;
  console.log(
    `Starting endless factory tick saga (with period length of ${updateDelayMs}ms)`
  );
  while (true) {
    yield delay(updateDelayMs);
    //console.log('Recompute economics of Factory');

    // Current State
    const currentLiquidAsset = (yield select(
      factoryLiquidAssetSelector
    )) as LiquidAsset;

    // Get income from the pending goods out buffer (Dispatch)

    // Get material investment from pending goods in buffer (Procurement)

    // Compute the cumulative current running cost of all service providers over the last updateDelay and update the current assets.
    const currentServiceProviderCostPerTime = (yield select(
      currentServiceProviderCostPerTimeSelector
    )) as LiquidAsset;
    const currentServiceProviderCostOverPeriod =
      currentServiceProviderCostPerTime.dollars * updateDelayMs;

    // Update the store with the current liquid assets.
    yield put(
      setLiquidAsset(
        createLiquidAsset({
          dollars:
            currentLiquidAsset.dollars - currentServiceProviderCostOverPeriod
        })
      )
    );
  }
}

/**
 * Helper function to request and await fullfillment offers for an activity
 * @param activity Activity to be fullfilled
 * @returns ServiceProvider that has offered to fullfill the activity
 */
function* triggerRequestFullfillmentOfActivity(activity: Activity) {
  console.log(`Requesting fullfillment for activity ${activity.identity.id}`);
  yield put(requestFullfillmentOfActivity(activity));

  // Wait for a fullfillment offer for this activity to come back from service providers.
  let fullfillmentOffer: PayloadAction<{
    serviceProvider: ServiceProvider;
    activity: Activity;
  }>;
  while (true) {
    fullfillmentOffer = (yield take(
      offerFullfillmentOfActivity.type
    )) as PayloadAction<{
      serviceProvider: ServiceProvider;
      activity: Activity;
    }>;
    if (fullfillmentOffer.payload.activity.identity.id === activity.identity.id)
      break;
  }
  return fullfillmentOffer;
}

/**
 * Primary workflow for handling the creation of the workflows which drive the factory.
 * @param addedActiveBuildRequest Build Request just added to the active list
 */
function* buildRequestWorkflowSaga(
  addedActiveBuildRequest: PayloadAction<BuildRequest>
) {
  const { payload: buildRequest } = addedActiveBuildRequest;
  console.log(
    `Computing the required workflow for build request ${buildRequest.identity.id} (given the current active transmutation service providers in the factory)`
  );

  // Examine the build request desired end shape and material.
  // Hack for now - to a known hardcoded flow for the basic polymer cube part (which is the only thing the simulated market is requesting for now.)
  if (
    !(
      buildRequest.material.type === MaterialType.SimplePolymer &&
      buildRequest.endShape === BasicShape.Cube
    )
  ) {
    console.error('Unable to compute workflow for this material type / shape.');
    return;
  }

  // New Proposed Steps.
  // Build a simple flat array of activities (inside the workflow) (they will hold internal references to each other)
  const computedWorkflow = createWorkflow();

  // WIP: The workflow below assumes that the workflow can be achieved with a simple, naive first branch picked search of the graph to build a part.

  // Current topological output shape in workflow generation
  let currentTopologyState = createBasicShapeTransmutationState({
    shape: buildRequest.endShape
  });
  let previousTransmutationActivity: Activity;
  let currentTransmutationActivity: Activity;

  // 1. Request dispatch service provider and assign to final dispatch activity step.
  currentTransmutationActivity = createTransmutationActivity({
    identity: createNewIdentity({ displayName: 'Dispatch Part' }),
    startState: currentTopologyState,
    endState: createLiquidAssetTransmutationState({
      liquidAsset: buildRequest.fixedValue
    })
  });
  const dispatchOfferServiceProvider = (yield triggerRequestFullfillmentOfActivity(
    currentTransmutationActivity
  )) as PayloadAction<{
    serviceProvider: ServiceProvider;
    activity: Activity;
  }>;
  currentTransmutationActivity.serviceProviderId =
    dispatchOfferServiceProvider.payload.serviceProvider.id;
  computedWorkflow.activities.push(currentTransmutationActivity);
  previousTransmutationActivity = currentTransmutationActivity;

  // 2. Perform the transmutation step search
  while (true) {
    currentTransmutationActivity = createTransmutationActivity({
      identity: createNewIdentity({ displayName: 'Transmute Part' }),
      endState: currentTopologyState
    });
    const transmutationFullfillmentOffer = (yield triggerRequestFullfillmentOfActivity(
      currentTransmutationActivity
    )) as PayloadAction<{
      serviceProvider: ServiceProvider;
      activity: Activity;
    }>;
    const proposedServiceProvider =
      transmutationFullfillmentOffer.payload.serviceProvider;
    const proposedActivity = transmutationFullfillmentOffer.payload
      .activity as TransmutationActivity;
    if (!proposedActivity.startState) {
      console.error(
        'Transmutation fullfillment offer does not specify the start topology'
      );
      return;
    }

    currentTransmutationActivity.serviceProviderId = proposedServiceProvider.id;
    currentTransmutationActivity.nextActivityId =
      previousTransmutationActivity.identity;
    previousTransmutationActivity.previousActivityId =
      currentTransmutationActivity.identity;
    computedWorkflow.activities.push(currentTransmutationActivity);

    if (
      proposedActivity.startState.type === TransmutationStateType.BasicShapeType
    ) {
      currentTopologyState = proposedActivity.startState;
      previousTransmutationActivity = currentTransmutationActivity;
    } else {
      console.log(
        'Transmutation list complete (current transmutation does not start with basic shape topology)'
      );
      currentTransmutationActivity.identity.displayName = 'Procure Part';
      computedWorkflow.firstActivityId = currentTransmutationActivity.identity;
      break;
    }
  }

  // 3. Finally assemble the Transportation step search
  const serviceProviders = (yield select(
    factoryServiceProvidersSelector
  )) as ServiceProvider[];

  // Current activity is the first activity.
  while (currentTransmutationActivity.nextActivityId) {
    const currentTransmutationActivityNextActivityId =
      currentTransmutationActivity.nextActivityId;
    const nextTransmutationActivity = computedWorkflow.activities.find(
      a => a.identity.id === currentTransmutationActivityNextActivityId?.id
    ) as TransmutationActivity;
    if (!nextTransmutationActivity) {
      console.error(
        'Next activity Id does not have associated activity in the computed workflow activities.'
      );
      break;
    }

    const currentTransmutationActivityServiceProviderId =
      currentTransmutationActivity.serviceProviderId;
    const startTransmutationServiceProvider = serviceProviders.find(
      sp => sp.id.id === currentTransmutationActivityServiceProviderId?.id
    );
    const nextTransmutationActivityServiceProviderId =
      nextTransmutationActivity.serviceProviderId;
    const endTransmutationServiceProvider = serviceProviders.find(
      sp => sp.id.id === nextTransmutationActivityServiceProviderId?.id
    );
    if (
      !startTransmutationServiceProvider ||
      !endTransmutationServiceProvider
    ) {
      console.error(
        'Start or end transmutation activity does not have an associated service provider...'
      );
      break;
    }

    const currentTransportActivity = createTransportationActivity({
      identity: createNewIdentity({ displayName: 'Transport Part' }),
      startLocation: startTransmutationServiceProvider.location,
      endLocation: endTransmutationServiceProvider.location
    });
    const transportationFullfillmentOffer = (yield triggerRequestFullfillmentOfActivity(
      currentTransportActivity
    )) as PayloadAction<{
      serviceProvider: ServiceProvider;
      activity: Activity;
    }>;

    // Get the proposed transport service provider
    const proposedTransportServiceProvider =
      transportationFullfillmentOffer.payload.serviceProvider;

    // Update and insert the transport activity between the transmutation activities.
    currentTransmutationActivity.nextActivityId =
      currentTransportActivity.identity;
    nextTransmutationActivity.previousActivityId =
      currentTransmutationActivity.identity;

    currentTransportActivity.serviceProviderId =
      proposedTransportServiceProvider.id;
    currentTransportActivity.previousActivityId =
      currentTransmutationActivity.identity;
    currentTransportActivity.nextActivityId =
      nextTransmutationActivity.identity;
    computedWorkflow.activities.push(currentTransportActivity);

    currentTransmutationActivity = nextTransmutationActivity;
  }

  // Proposed workflow is now computed.
  console.log(
    `Proposed workflow computed! Id: ${computedWorkflow.identity.id} with ${computedWorkflow.activities.length} steps`
  );
  // Send out the proposed active build request workflow
  yield put(
    updateActiveBuildRequestWorkflow({
      buildRequestId: buildRequest.identity,
      workflow: computedWorkflow
    })
  );

  // Start and monitor workflow by accepting fullfillment of fist activity (at this point they should all have enough information to start).
  // Now we manage the execution of the sequential workflow activities.
  let currentExecutingActivityId = computedWorkflow.firstActivityId;

  while (true) {
    const currentExecutingActivityIdUuid = currentExecutingActivityId.id;
    const currentExecutingActivity = computedWorkflow.activities.find(
      a => a.identity.id === currentExecutingActivityIdUuid
    );
    if (
      !currentExecutingActivity ||
      !currentExecutingActivity.serviceProviderId
    ) {
      console.error(
        'Unabled to find current executing activity in computed workflow or the activitiy service provider is undefined'
      );
      break;
    }
    const currentExecutingServiceProvider = serviceProviders.find(
      sp => sp.id.id === currentExecutingActivity.serviceProviderId?.id
    );
    if (!currentExecutingServiceProvider) {
      console.error(
        'Unabled to find current executing activities service provider'
      );
      break;
    }

    // Start the activity.
    console.log(
      `Starting activity ${currentExecutingActivity.identity.id} in workflow ${computedWorkflow.identity.id}`
    );
    yield put(
      acceptFullfillmentOfActivity({
        serviceProvider: currentExecutingServiceProvider,
        activity: currentExecutingActivity
      })
    );

    // Wait for the activity to complete.

    // TODO: while true take

    console.log(
      `Completed activity ${currentExecutingActivity.identity.id} in workflow ${computedWorkflow.identity.id}`
    );

    // Get next activity or break, if we have reached the end.
    if (!currentExecutingActivity.nextActivityId) break;
    currentExecutingActivityId = currentExecutingActivity.nextActivityId;
  }

  // Onced completed remove the active build request (Or move to a completed state / section).
  console.log(`Completed workflow ${computedWorkflow.identity.id}`);
}

export function* factoryWatchAddActiveBuildRequestSaga() {
  yield takeEvery(addActiveBuildRequest.type, buildRequestWorkflowSaga);
}

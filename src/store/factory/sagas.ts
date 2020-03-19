import { delay, takeEvery, select, put, take } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { BuildRequest } from '../buildrequest/types';
import {
  addActiveBuildRequest,
  setLiquidAsset,
  updateActiveBuildRequestWorkflow,
  requestFullfillmentOfActivity,
  offerFullfillmentOfActivity
} from './slice';
import { config } from '../../env/config';
import {
  factoryLiquidAssetSelector,
  currentServiceProviderCostPerTimeSelector
} from './selectors';
import { LiquidAsset } from '../economic/types';
import { createLiquidAsset } from '../economic/factories';
import {
  createWorkflow,
  createTransmutationActivity
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
  console.log(`Requesting fullfillment for activity ${activity.identity.uuid}`);
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
    if (
      fullfillmentOffer.payload.activity.identity.uuid ===
      activity.identity.uuid
    )
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
    `Computing the required workflow for build request ${buildRequest.identity.uuid} (given the current active transmutation service providers in the factory)`
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
  let previousActivity: Activity;
  let currentActivity: Activity;

  // 1. Request dispatch service provider and assign to final dispatch activity step.
  currentActivity = createTransmutationActivity({
    identity: createNewIdentity({ displayName: 'Dispatch Part' }),
    startState: currentTopologyState,
    endState: createLiquidAssetTransmutationState({
      liquidAsset: buildRequest.fixedValue
    })
  });
  const dispatchOfferServiceProvider = (yield triggerRequestFullfillmentOfActivity(
    currentActivity
  )) as PayloadAction<{
    serviceProvider: ServiceProvider;
    activity: Activity;
  }>;
  currentActivity.serviceProviderId =
    dispatchOfferServiceProvider.payload.serviceProvider.id;
  computedWorkflow.activities.push(currentActivity);
  previousActivity = currentActivity;

  // 2. Perform the transmutation step search
  while (true) {
    currentActivity = createTransmutationActivity({
      identity: createNewIdentity({ displayName: 'Transmute Part' }),
      endState: currentTopologyState
    });
    const transmutationFullfillmentOffer = (yield triggerRequestFullfillmentOfActivity(
      currentActivity
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

    currentActivity.serviceProviderId = proposedServiceProvider.id;
    currentActivity.nextActivityId = previousActivity.identity;
    previousActivity.previousActivityId = currentActivity.identity;
    computedWorkflow.activities.push(currentActivity);

    if (
      proposedActivity.startState.type === TransmutationStateType.BasicShape
    ) {
      currentTopologyState = proposedActivity.startState;
      previousActivity = currentActivity;
    } else {
      console.log(
        'Transmutation list complete (current transmutation does not start with basic shape topology)'
      );
      currentActivity.identity.displayName = 'Procure Part';
      computedWorkflow.firstActivityId = currentActivity.identity;
      break;
    }
  }

  // 3. Finally assemble the Transportation step search

  // TODO (loop again though all the activities, this time, trying to connect them up)

  // Proposed workflow is now computed.
  console.log(
    `Proposed workflow computed! Id: ${computedWorkflow.identity.uuid} with ${computedWorkflow.activities.length} steps`
  );
  // Send out the proposed active build request workflow
  yield put(
    updateActiveBuildRequestWorkflow({
      buildRequestId: buildRequest.identity,
      workflow: computedWorkflow
    })
  );

  // *** TODO: Move up ******
  // Start and monitor workflow by accepting fullfillment of fist activity (at this point they should all have enough information to start).
  // Now we manage the execution of the sequential workflow activities.
  /*
  for (const activity of computedWorkflow.activities) {
    console.log(`Requesting fullfillment for ${activity.identity.uuid}`);
    yield put(requestFullfillmentOfActivity(activity));

    // Wait for a fullfillment offer for this activity to come back from service providers.
    let fullfillmentOffer: PayloadAction<{
      serviceProviderId: Identity;
      activityId: Identity;
    }>;
    while (true) {
      fullfillmentOffer = (yield take(
        offerFullfillmentOfActivity.type
      )) as PayloadAction<{
        serviceProviderId: Identity;
        activityId: Identity;
      }>;
      if (fullfillmentOffer.payload.activityId.uuid === activity.identity.uuid)
        break;
    }

    // Simple first come first accept basis.
    console.log(
      `Recieved and accepted first fullfillment offer for activity ${activity.identity.uuid} from service provider ${fullfillmentOffer.payload.serviceProviderId.uuid}`
    );
    yield put(acceptFullfillmentOfActivity(fullfillmentOffer.payload));

    // Now finally, await completion of this activity (when completed is no longer undefined).
    let activtyUpdate: PayloadAction<{
      buildRequestId: Identity;
      activity: Activity;
    }>;
    while (true) {
      activtyUpdate = (yield take(
        offerFullfillmentOfActivity.type
      )) as PayloadAction<{ buildRequestId: Identity; activity: Activity }>;
      if (
        activtyUpdate.payload.activity.identity.uuid ===
          activity.identity.uuid &&
        activtyUpdate.payload.activity.completed
      )
        break;
    }

    console.log(
      `Starting execution workflow ${computedWorkflow.identity.uuid}`
    );

    console.log(
      `Activity completed ${activity.identity.uuid} by service provider ${fullfillmentOffer.payload.serviceProviderId.uuid}`
    );

    // This is the hard coded workflow - this is too simple to work.
    /*
  const computedWorkflow = createWorkflow({
    identity: createNewIdentity({ displayName: 'Basic Generated Workflow' }),
    activities: [
      createProcurementActivity({
        identity: createNewIdentity({ displayName: 'Purchase Material' })
      }),
      createTransportationActivity({
        identity: createNewIdentity({ displayName: 'Move to Printer' })
      }),
      createTransmutationActivity({
        identity: createNewIdentity({ displayName: 'Printing' }),
        material: MaterialType.SimplePolymer,
        startTopology: BasicShape.Spool,
        endTopology: BasicShape.RoughCube
      }),
      createTransmutationActivity({
        identity: createNewIdentity({ displayName: 'Hand Finishing' }),
        material: MaterialType.SimplePolymer,
        startTopology: BasicShape.RoughCube,
        endTopology: BasicShape.Cube
      }),
      createTransportationActivity({
        identity: createNewIdentity({ displayName: 'Move to Output Bay' })
      }),
      createDispatchActivity({
        identity: createNewIdentity({ displayName: 'Dispatch Part' })
      })
    ]
  });*/

  // Onced completed remove the active build request (Or move to a completed state / section).
  console.log(`Completed workflow ${computedWorkflow.identity.uuid}`);
}

export function* factoryWatchAddActiveBuildRequestSaga() {
  yield takeEvery(addActiveBuildRequest.type, buildRequestWorkflowSaga);
}

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
  currentServiceProviderCostPerTimeSelector
} from './selectors';
import { LiquidAsset } from '../economic/types';
import { createLiquidAsset } from '../economic/factories';
import {
  createWorkflow,
  createProcurementActivity,
  createTransmutationActivity,
  createTransportationActivity,
  createDispatchActivity
} from '../workflow/factories';
import { createNewIdentity } from '../common/identity/factories';
import { BasicShape } from '../common/topology/types';
import { MaterialType } from '../material/types';
import { Identity } from '../common/identity/types';
import { Activity } from '../workflow/types';

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

    // Get income from the pending goods out buffer

    // Get material investment from pending goods in buffer

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
    console.error('Unable to compute workflow for this shape.');
    return;
  }

  // New Proposed Steps.
  // Build a simple flat array of activities (inside the workflow) (they will hold internal references to each other)
  const computedWorkflow = createWorkflow();

  while (true) {
    // 1. Request dispatch service provider and assign to final dispatch activity step.

    // 2. Request final transmutation service provider and assign to activity step (link as activity before / update dispatch service provider link)
    // 2a. Repeat for each step mapping from output -> input shape (till there are no more service providers)

    // 3. Request procurement service provider for this 'most basic' material shape. (keep linked structure correct)

    // 4. Request transport provider activites to link all the previous steps. (keep linked structure correct)
    break;
  }

  // Proposed workflow is now computed.
  console.log(
    `Proposed workflow computed! Id: ${computedWorkflow.identity.uuid} with ${computedWorkflow.activities.length} steps`
  );

  // *** TODO: Move up ******
  // Start and monitor workflow by accepting fullfillment of fist activity (at this point they should all have enough information to start).
  // Now we manage the execution of the sequential workflow activities.
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

    // Send out the proposed active build request workflow
    yield put(
      updateActiveBuildRequestWorkflow({
        buildRequestId: buildRequest.identity,
        workflow: computedWorkflow
      })
    );

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
  }

  // Onced completed remove the active build request (Or move to a completed state / section).
  console.log(`Completed workflow ${computedWorkflow.identity.uuid}`);
}

export function* factoryWatchAddActiveBuildRequestSaga() {
  yield takeEvery(addActiveBuildRequest.type, buildRequestWorkflowSaga);
}

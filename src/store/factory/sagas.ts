import { delay, takeEvery, select, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { BuildRequest } from '../buildrequest/types';
import {
  addActiveBuildRequest,
  setLiquidAsset,
  updateActiveBuildRequestWorkflow,
  requestFufillmentOfActivity
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

function* processAddActiveBuildRequestSaga(
  addedActiveBuildRequest: PayloadAction<BuildRequest>
) {
  const { payload: buildRequest } = addedActiveBuildRequest;
  console.log(
    `Processing recently added active build request ${buildRequest.identity.uuid}`
  );

  // Examine the build request desired end shape and material.

  console.log(
    'Computing the required workflow for this build request (given the current active transmutation service providers in the factory)'
  );

  // TODO: Perform a depth first tree search for transmutation path looking at compatible states.
  //
  //    const factoryTransmutationServiceProviders = (yield select(
  //      factoryTransmutationServiceProvidersSelector
  //    )) as TransmutationServiceProvider[];
  //    E.g. Filter the service providers to the ones with compatible materials. examine the build request desired end shape and material.
  //         const materialCompatableTransSPs = factoryTransmutationServiceProviders.filter(sp => sp.supportedMaterials.find(m => m === buildRequest.material.type));

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

  // This is the hard coded workflow.
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
  });

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

  console.log(`Starting workflow ${computedWorkflow.identity.uuid}`);

  // Now we manage the execution of the sequential workflow activities.
  for (const activity of computedWorkflow.activities) {
    // 1. add the activity to the openActivities market.
    yield put(requestFufillmentOfActivity(activity));

    // 2. Service providers who have the appropriate capabilities will bid/assign themselves
    // (right now a simple first come first serve basis - in the future this should be an automous process based on cost quotes and a reputation system.)

    // 3. Await for the completion of that N'th activity step
    yield delay(5000);
  }

  // Onced completed remove the active build request (Or move to a completed state / section).
  console.log(`Completed workflow ${computedWorkflow.identity.uuid}`);
}

export function* factoryWatchAddActiveBuildRequestSaga() {
  yield takeEvery(addActiveBuildRequest.type, processAddActiveBuildRequestSaga);
}

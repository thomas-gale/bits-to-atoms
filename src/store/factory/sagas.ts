import { delay, takeEvery, select, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { BuildRequest } from '../buildrequest/types';
import { addActiveBuildRequest, setLiquidAsset } from './slice';
import { config } from '../../env/config';
import {
  factoryLiquidAssetSelector,
  currentServiceProviderCostPerTimeSelector,
  factoryTransmutationServiceProvidersSelector
} from './selectors';
import { LiquidAsset } from '../economic/types';
import { createLiquidAsset } from '../economic/factories';
import { ServiceProvider } from './services/types';

export function* factoryUpdateTickSaga() {
  const updateDelayMs = config.factory.updatePeriodMs;
  console.log(
    `Starting endless factory tick saga (with period length of ${updateDelayMs}ms)`
  );
  while (true) {
    yield delay(updateDelayMs);
    console.log('Recompute economics of Factory');

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

  // Perform a nice tree search for transmutation path. (hacked for now) to match current service providers to the
  const factoryTransmutationServiceProviders = (yield select(
    factoryTransmutationServiceProvidersSelector
  )) as ServiceProvider[];

  

  console.log(
    'Compute the required workflow for this build request (given the current active service providers in the factory'
  );

  // This will involve updating the workflow / actions
  // Service providers are automatically looking out for compatible un-allocated actions from the factory.
}

export function* watchAddActiveBuildRequestSaga() {
  yield takeEvery(addActiveBuildRequest.type, processAddActiveBuildRequestSaga);
}

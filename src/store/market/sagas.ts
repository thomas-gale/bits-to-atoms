import { delay, put, select, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { config } from '../../env/config';
import { PartType, BuildRequest } from './types';

import { createNewIdentity } from '../common/identity/factories';
import { createSimplePolymerMaterial } from '../material/factories';
import { createLiquidAsset } from '../economic/factories';
import { createBuildRequest } from './factories';

import { buildRequestsSelector } from './selectors';
import { isAllowedToBidSelector } from '../factory/selectors';

import {
  requestBidBuildRequest,
  addBuildRequest,
  removeBuildRequest
} from './slice';
import { addActiveBuildRequest } from '../factory/slice';

/**
 * Helper function to sample randomly part names.
 * @param partNames
 */
function getRandomPartName({
  partNames = config.market.simpleMarketSaga.partNames
} = {}) {
  return partNames[Math.floor(Math.random() * partNames.length)];
}

/**
 * Helper function to sample randomly ints from a range.
 * @param range
 */
function getRandomFromIntRange({ min = 5, max = 10 } = {}) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Runs a simple fixed market simulation.
 * Parts are randomly added and removed after a certain time.
 */
export function* simpleMarketSaga() {
  console.log('Starting Simple Market');
  //return;
  while (true) {
    // Check size of build requests open on the market
    const buildRequests = (yield select(
      buildRequestsSelector
    )) as BuildRequest[];
    if (
      buildRequests.length >=
      config.market.simpleMarketSaga.maxNumberOpenRequests
    ) {
      // Remove the oldest one.
      const oldestBuildRequest = buildRequests.reduce((prev, curr) => {
        return prev.created < curr.created ? prev : curr;
      });
      yield put(removeBuildRequest(oldestBuildRequest.identity));
    } else {
      // Add a new build request to the market.
      const sizeAndValue = getRandomFromIntRange(
        config.market.simpleMarketSaga.partValueRange
      );
      yield put(
        addBuildRequest(
          createBuildRequest({
            identity: createNewIdentity({ displayName: getRandomPartName() }),
            material: createSimplePolymerMaterial(),
            fixedValue: createLiquidAsset({ dollars: sizeAndValue }),
            type: PartType.Cube,
            size: sizeAndValue
          })
        )
      );
    }

    // Random ranged delay for a short while after each update.
    yield delay(
      getRandomFromIntRange(config.market.simpleMarketSaga.processingDelayRange)
    );
  }
}

export function* buildRequestBidSaga(
  requestBidBuildRequest: PayloadAction<BuildRequest>
) {
  const buildRequest = requestBidBuildRequest.payload;

  // First Check that the factory is able to make this request (the UI should be disabled if that's the case)
  // E.g is the number of active build requests more than maximum.
  const isAllowedToBid = (yield select(isAllowedToBidSelector)) as boolean;

  // If the factory entity was allowed to bid
  if (isAllowedToBid) {
    // Remove the build request from the list in the Market
    yield put(removeBuildRequest(buildRequest.identity));

    // Add the Build Request to the Factory's active build requests.
    yield put(addActiveBuildRequest(buildRequest));
  }
}

export function* watchRequestAddBuildRequestSaga() {
  yield takeEvery(requestBidBuildRequest.type, buildRequestBidSaga);
}

import { delay, put } from 'redux-saga/effects';
import { addBuildRequest } from './slice';
import { PartType } from './types';
import { createNewIdentity } from '../common/identity/factories';
import { createSimplePolymerMaterial } from '../material/factories';
import { createLiquidAsset } from '../economic/factories';
import { createBuildRequest } from './factories';

const partNames = [
  'widget',
  'thingy',
  'whatchamacallits',
  'thingamajig',
  'doohickey'
];

function getRandomPartName() {
  return partNames[Math.floor(Math.random() * partNames.length)];
}

function getRandomSizeValue({ min = 5, max = 10} = {}) {
  return Math.floor(Math.random() *(max - min) + min);
}

/**
 * Runs a simple fixed market simulation.
 * Parts are randomly added and removed after a certain time.
 */
export function* simpleMarketSaga() {
  console.log('Starting Simple Market');
  while (true) {
    // Check size of market, if greater than some threshold, start simulating the removal of the oldest ones.
    // TODO.

    // Add a new build request to the market.
    const sizeAndValue = getRandomSizeValue();
    yield put(addBuildRequest(
      createBuildRequest({
        identity: createNewIdentity({ displayName: getRandomPartName() }),
        material: createSimplePolymerMaterial(),
        fixedValue: createLiquidAsset({ dollars: sizeAndValue }),
        type: PartType.Cube,
        size: sizeAndValue
      })
    ));

    // Delay for a short while.
    yield delay(2000);
  }
}

import { delay, put } from 'redux-saga/effects';
import { addBuildRequest } from './slice';
import { BuildRequest, PartType } from './types';
import { createNewIdentity } from '../common/identity/factories';
import { createSimplePolymerMaterial } from '../material/factories';
import { createLiquidAsset } from '../economic/factories';

export function* marketShortRunSaga() {
  console.log('Starting short test market saga.');
  yield delay(2000);
  const design1: BuildRequest = {
    identity: createNewIdentity({ displayName: 'cube1' }),
    material: createSimplePolymerMaterial(),
    fixedValue: createLiquidAsset({ dollars: 10 }),
    type: PartType.Cube,
    size: 8
  };
  yield put(addBuildRequest(design1));
  yield delay(2000);
  const design2: BuildRequest = {
    identity: createNewIdentity({ displayName: 'cube2' }),
    material: createSimplePolymerMaterial(),
    fixedValue: createLiquidAsset({ dollars: 15 }),
    type: PartType.Cube,
    size: 10
  };
  yield put(addBuildRequest(design2));
  console.log('Completed short test market saga.');
}

import { delay, put } from 'redux-saga/effects';
import { addBuildRequest } from './slice';
import { BuildRequest, PartType } from './types';
import { createNewIdentity } from '../common/types';

export function* marketShortRunSaga() {
  console.log('Starting short test market saga.');
  yield delay(2000);
  const design1: BuildRequest = {
    identity: createNewIdentity('cube1'),
    type: PartType.CUBE,
    size: 8
  };
  yield put(addBuildRequest(design1));
  yield delay(2000);
  const design2: BuildRequest = {
    identity: createNewIdentity('cube2'),
    type: PartType.CUBE,
    size: 8
  };
  yield put(addBuildRequest(design2));
  console.log('Completed short test market saga.');
}

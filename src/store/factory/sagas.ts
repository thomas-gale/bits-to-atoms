import { delay, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { BuildRequest } from '../buildrequest/types';
import { addActiveBuildRequest } from './slice';

export function* factoryUpdateTickSaga() {
  console.log('Starting endless factory tick saga.');
  while (true) {
    yield delay(1000);
    console.log('Recompute economics of Factory');
  }
}

function* processAddActiveBuildRequestSaga(
  addedActiveBuildRequest: PayloadAction<BuildRequest>
) {
  const { payload: buildRequest } = addedActiveBuildRequest;

  console.log(
    `Processing added active build request ${buildRequest.identity.uuid}`
  );

  console.log(
    'Check / take any new build requests added to active build request list by user'
  );

  yield delay(1000);
  console.log(
    'Compute the required workflow for this build request (given the current active service providers in the factory'
  );

  // This will involve updating the workflow / actions
  // Service providers are automatically looking out for compatible un-allocated actions from the factory.
}

export function* watchAddActiveBuildRequestSaga() {
  yield takeEvery(addActiveBuildRequest.type, processAddActiveBuildRequestSaga);
}

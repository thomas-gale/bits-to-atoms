import { takeEvery, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { Identity } from '../../../common/identity/types';
import { Workflow } from '../../../workflow/types';
import { updateActiveBuildRequestWorkflow } from '../../slice';

function* competeToRealiseWorkflow(
  _updatedActiveBuildRequestWorkflow: PayloadAction<{
    buildRequestId: Identity;
    workflow: Workflow;
  }>
) {
  console.log(
    'Human worker trying to compete for what it can do to satisfy the required workflow steps.'
  );
  console.log(
    'Human worker only interested in transport and transmutation RoughCube -> Cube'
  );
  yield delay(100);
}

export function* humanWorkerWatchOpenActivitiesSaga() {
  yield takeEvery(
    updateActiveBuildRequestWorkflow.type,
    competeToRealiseWorkflow
  );
}

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
    'Dipatch service trying to compete for what it can do to satisfy the required workflow steps.'
  );
  console.log(
    'Dipatch service only interested in dispatch e.g. Cube -> Liquid Asset'
  );
  yield delay(100);
}

export function* dispatchServiceWatchOpenActivitiesSaga() {
  yield takeEvery(
    updateActiveBuildRequestWorkflow.type,
    competeToRealiseWorkflow
  );
}

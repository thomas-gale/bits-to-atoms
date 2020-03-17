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
    'Procurement service trying to compete for what it can do to satisfy the required workflow steps.'
  );
  console.log(
    'Procurement service only interested in procurement e.g. Liquid Asset -> Material Spool'
  );
  yield delay(100);
}

export function* procurementServiceWatchOpenActivitiesSaga() {
  yield takeEvery(
    updateActiveBuildRequestWorkflow.type,
    competeToRealiseWorkflow
  );
}

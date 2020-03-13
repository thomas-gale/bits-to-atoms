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
    'FFF printer trying to compete for what it can do to satisfy the required workflow steps.'
  );
  console.log(
    'FFF printer only interested in transmutation Spool -> RoughCube'
  );
  yield delay(100);
}

export function* fffPrinterWatchWorkflowUpdatesSaga() {
  yield takeEvery(
    updateActiveBuildRequestWorkflow.type,
    competeToRealiseWorkflow
  );
}

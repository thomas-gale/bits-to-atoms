import { takeEvery, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { Activity, ActivityType } from '../../../workflow/types';
import { requestFufillmentOfActivity } from '../../slice';

function* generateBidWorkflow(
  requestFufillmentOfActivity: PayloadAction<Activity>
) {
  const activity = requestFufillmentOfActivity.payload;
  if (activity.type === ActivityType.Procurement) {
    console.log(
      'Procurement service will generate quote for this procurement activity'
    );
    yield delay(100);
  }
}

export function* watchRequestFufillmentOfActivitySaga() {
  yield takeEvery(requestFufillmentOfActivity.type, generateBidWorkflow);
}

import { takeEvery, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { Activity, ActivityType } from '../../../workflow/types';
import { requestFufillmentOfActivity } from '../../slice';

function* generateBidWorkflow(
  requestFufillmentOfActivity: PayloadAction<Activity>
) {
  const activity = requestFufillmentOfActivity.payload;
  if (activity.type === ActivityType.Dispatch) {
    console.log(
      'Dispatch service will generate quote for this dispatch activity'
    );
    yield delay(100);
  }
}

export function* watchRequestFufillmentOfActivitySaga() {
  yield takeEvery(requestFufillmentOfActivity.type, generateBidWorkflow);
}

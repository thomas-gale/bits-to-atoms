import { takeEvery, select, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { ServiceProvider, ServiceType } from '../types';
import { DispatchService } from './types';
import { Activity, ActivityType } from '../../../workflow/types';
import {
  requestFullfillmentOfActivity,
  offerFullfillmentOfActivity
} from '../../slice';
import { factoryServiceProvidersSelector } from '../../selectors';

function* generateBidWorkflow(
  requestFufillmentOfActivity: PayloadAction<Activity>
) {
  const activity = requestFufillmentOfActivity.payload;

  // When generating bids, get the dispatch services from the dispatch's service providers.
  const serviceProviders = (yield select(
    factoryServiceProvidersSelector
  )) as ServiceProvider[];
  const dispatchServiceProviders = serviceProviders.filter(
    sp => sp.type === ServiceType.Dispatch
  ) as DispatchService[];

  // Grab the first service provider that can bid.
  // TD: In the future service providers should be able to bid on future tasks to append to a buffer.
  const availableDispatchServiceProviders = dispatchServiceProviders.filter(
    psp => psp.canBid
  );
  const dispatchServiceProvider =
    availableDispatchServiceProviders.length > 0
      ? availableDispatchServiceProviders[0]
      : undefined;
  if (!dispatchServiceProvider) {
    console.warn(
      `Unable to generate bid for activity ${activity.identity.uuid}, no dispatch services available`
    );
    return; // Early return if no service providers available to bid.
  }

  if (activity.type === ActivityType.Dispatch) {
    console.log(
      'Dispatch service will generate quote for this dispatch activity'
    );
    yield put(
      offerFullfillmentOfActivity({
        serviceProviderId: dispatchServiceProvider.id,
        activityId: activity.identity
      })
    );
  }
}

export function* watchRequestFufillmentOfActivitySaga() {
  yield takeEvery(requestFullfillmentOfActivity.type, generateBidWorkflow);
}

import { takeEvery, select, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { Activity, ActivityType } from '../../../workflow/types';
import {
  requestFullfillmentOfActivity,
  offerFullfillmentOfActivity
} from '../../slice';
import { factoryServiceProvidersSelector } from '../../selectors';
import { ServiceProvider, ServiceType } from '../types';
import { ProcurementService } from './types';

function* generateBidWorkflow(
  requestFufillmentOfActivity: PayloadAction<Activity>
) {
  const activity = requestFufillmentOfActivity.payload;

  // When generating bids, get the procurement services from the factory's service providers.
  const serviceProviders = (yield select(
    factoryServiceProvidersSelector
  )) as ServiceProvider[];
  const procurementServiceProviders = serviceProviders.filter(
    sp => sp.type === ServiceType.Procurement
  ) as ProcurementService[];

  // Grab the first service provider that can bid.
  // TD: In the future service providers should be able to bid on future tasks to append to a buffer.
  const availableProcurementServiceProviders = procurementServiceProviders.filter(
    psp => psp.canBid
  );
  const procurmentServiceProvider =
    availableProcurementServiceProviders.length > 0
      ? availableProcurementServiceProviders[0]
      : undefined;
  if (!procurmentServiceProvider) {
    console.warn(
      `Unable to generate bid for activity ${activity.identity.uuid}, no procurement services available`
    );
    return; // Early return if no service providers available to bid.
  }

  if (activity.type === ActivityType.Procurement) {
    console.log(
      `Procurement service ${procurmentServiceProvider.id.uuid} will offer fullfillment for this procurement activity`
    );
    yield put(
      offerFullfillmentOfActivity({
        serviceProvider: procurmentServiceProvider,
        activity: activity
      })
    );
  }
}

export function* watchRequestFufillmentOfActivitySaga() {
  yield takeEvery(requestFullfillmentOfActivity.type, generateBidWorkflow);
}

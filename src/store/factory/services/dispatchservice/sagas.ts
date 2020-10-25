import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, select, takeEvery } from 'redux-saga/effects';
import {
  Activity,
  ActivityType,
  TransmutationActivity,
} from '../../../workflow/types';
import { factoryServiceProvidersSelector } from '../../selectors';
import {
  acceptFullfillmentOfActivity,
  offerFullfillmentOfActivity,
  requestFullfillmentOfActivity,
  updateActivity,
} from '../../slice';
import { ServiceProvider, ServiceType } from '../types';
import { DispatchService } from './types';

function* generateBidWorkflow(
  requestFufillmentOfActivity: PayloadAction<Activity>
) {
  const activity = requestFufillmentOfActivity.payload;

  // When generating bids, get the dispatch services from the dispatch's service providers.
  const serviceProviders = (yield select(
    factoryServiceProvidersSelector
  )) as ServiceProvider[];
  const dispatchServiceProviders = serviceProviders.filter(
    (sp) => sp.type === ServiceType.Dispatch
  ) as DispatchService[];

  // Grab the first service provider that can bid.
  // TD: In the future service providers should be able to bid on future tasks to append to a buffer.
  const availableDispatchServiceProviders = dispatchServiceProviders.filter(
    (psp) => psp.canBid
  );
  const dispatchServiceProvider =
    availableDispatchServiceProviders.length > 0
      ? availableDispatchServiceProviders[0]
      : undefined;
  if (!dispatchServiceProvider) {
    console.warn(
      `Unable to generate bid for activity ${activity.id}, no dispatch services available`
    );
    return; // Early return if no service providers available to bid.
  }

  if (activity.type === ActivityType.Transmutation) {
    console.log(
      'Dispatch service will generate quote for this transmutation activity'
    );
    yield put(
      offerFullfillmentOfActivity({
        serviceProvider: dispatchServiceProvider,
        activity: activity,
      })
    );
  }
}

function* executeActivityWorkflow(
  action: PayloadAction<{
    serviceProvider: ServiceProvider;
    activity: Activity;
  }>
) {
  if (action.payload.serviceProvider.type !== ServiceType.Dispatch) return;
  const serviceProvider = action.payload.serviceProvider as DispatchService;
  const activity = action.payload.activity as TransmutationActivity;

  // Started timestamp.
  activity.started = new Date();

  // Interact with virtual market and exchange the factory liquid asset for the material fixed asset to add to worshop.
  // Somehow assign the material fixed asset to this active activity / build request?
  console.log(
    `Dispatch service ${serviceProvider.id} starting to execute transmutation activity ${activity.id}`
  );
  yield delay(10);

  // Completed timestamp and update.
  activity.completed = new Date();
  yield put(updateActivity(activity));
}

export function* watchRequestFufillmentOfActivitySaga() {
  yield takeEvery(requestFullfillmentOfActivity.type, generateBidWorkflow);
}

export function* watchAcceptFullfillmentOfActivitySaga() {
  yield takeEvery(acceptFullfillmentOfActivity.type, executeActivityWorkflow);
}

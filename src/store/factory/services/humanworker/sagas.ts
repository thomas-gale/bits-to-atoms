import { takeEvery, delay, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { Activity, ActivityType } from '../../../workflow/types';
import { requestFufillmentOfActivity } from '../../slice';
import { factoryServiceProvidersSelector } from '../../selectors';
import { ServiceProvider, ServiceType } from '../types';
import { HumanWorker } from './types';

function* generateBidWorkflow(
  requestFufillmentOfActivity: PayloadAction<Activity>
) {
  const activity = requestFufillmentOfActivity.payload;

  // When generating bids, get the Human workers from the factory's service providers.
  const serviceProviders = (yield select(
    factoryServiceProvidersSelector
  )) as ServiceProvider[];
  const humanServiceProviders = serviceProviders.filter(
    sp => sp.type === ServiceType.HumanWorker
  ) as HumanWorker[];

  // Grab the first service provider that is not assigned a task.
  // TD: In the future service providers should be able to bid on future tasks to append to a buffer.
  const availableHumanServiceProviders = humanServiceProviders.filter(
    hsp => !hsp.currentActivity
  );
  const humanServiceProvider =
    availableHumanServiceProviders.length > 0
      ? availableHumanServiceProviders[0]
      : undefined;
  if (!humanServiceProvider) {
    console.warn(
      `Unable to generate bid for activity ${activity.identity.uuid}, no human workers available`
    );
    return; // Early return if no service providers available to bid.
  }

  if (activity.type === ActivityType.Transportation) {
    console.log(
      `Human worker service ${humanServiceProvider.id.uuid} will generate quote for this transportation activity`
    );
    yield delay(100);
  } else if (activity.type === ActivityType.Transmutation) {
    if (
      humanServiceProvider.supportedInputTopologies.find(
        inputShape => inputShape === activity.startTopology
      ) &&
      humanServiceProvider.supportedOutputTopologies.find(
        outputShape => outputShape === activity.endTopology
      )
    ) {
      console.log(
        `Human worker service ${humanServiceProvider.id.uuid} will generate quote for this transmutation activity`
      );
      yield delay(100);
    }
  }
}

export function* watchRequestFufillmentOfActivitySaga() {
  yield takeEvery(requestFufillmentOfActivity.type, generateBidWorkflow);
}

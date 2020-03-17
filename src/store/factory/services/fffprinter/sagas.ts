import { takeEvery, delay, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { Activity, ActivityType } from '../../../workflow/types';
import { requestFufillmentOfActivity } from '../../slice';
import { factoryServiceProvidersSelector } from '../../selectors';
import { ServiceProvider, ServiceType } from '../types';
import { FFFPrinter } from './types';

function* generateBidWorkflow(
  requestFufillmentOfActivity: PayloadAction<Activity>
) {
  const activity = requestFufillmentOfActivity.payload;

  // When generating bids, get the fff printers from the factory's service providers.
  const serviceProviders = (yield select(
    factoryServiceProvidersSelector
  )) as ServiceProvider[];
  const fffPrinterServiceProviders = serviceProviders.filter(
    sp => sp.type === ServiceType.FFFPrinter
  ) as FFFPrinter[];

  // Grab the first service provider that is not assigned a task.
  // TD: In the future service providers should be able to bid on future tasks to append to a buffer.
  const availableFFFPrinterServiceProviders = fffPrinterServiceProviders.filter(
    fffpsp => !fffpsp.currentActivity
  );
  const fffPrinterServiceProvider =
    availableFFFPrinterServiceProviders.length > 0
      ? availableFFFPrinterServiceProviders[0]
      : undefined;
  if (!fffPrinterServiceProvider) {
    console.warn(
      `Unable to generate bid for activity ${activity.identity.uuid}, no fff printers available`
    );
    return; // Early return if no service providers available to bid.
  }

  if (activity.type === ActivityType.Transmutation) {
    if (
      fffPrinterServiceProvider.supportedInputTopologies.find(
        inputShape => inputShape === activity.startTopology
      ) &&
      fffPrinterServiceProvider.supportedOutputTopologies.find(
        outputShape => outputShape === activity.endTopology
      )
    ) {
      console.log(
        `FFF printer service ${fffPrinterServiceProvider.id.uuid} will generate quote for this transmutation activity`
      );
      yield delay(100);
    }
  }
}

export function* watchRequestFufillmentOfActivitySaga() {
  yield takeEvery(requestFufillmentOfActivity.type, generateBidWorkflow);
}

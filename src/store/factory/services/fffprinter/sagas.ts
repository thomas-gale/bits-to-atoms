import { takeEvery, select, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { Activity, ActivityType } from '../../../workflow/types';
import {
  requestFullfillmentOfActivity,
  offerFullfillmentOfActivity
} from '../../slice';
import { factoryServiceProvidersSelector } from '../../selectors';
import { ServiceProvider, ServiceType } from '../types';
import { FFFPrinter } from './types';
import transitions from '@material-ui/core/styles/transitions';
import { BasicShape } from '../../../common/topology/types';

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

  // Grab the first service provider that can bid.
  // TD: In the future service providers should be able to bid on future tasks to append to a buffer.
  const availableFFFPrinterServiceProviders = fffPrinterServiceProviders.filter(
    fffpsp => fffpsp.canBid
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
    const chosenTopologyTransition = fffPrinterServiceProvider.supportedTopologyTransitions.find(
      transition => transition[1] === activity.endTopology
    );
    if (chosenTopologyTransition) {
      console.log(
        `FFF printer service ${fffPrinterServiceProvider.id.uuid} will offer fullfillment for this transmutation activity . (Appending required input topology)`
      );
      activity.startTopology = chosenTopologyTransition[0];
      yield put(
        offerFullfillmentOfActivity({
          serviceProvider: fffPrinterServiceProvider,
          activity: activity
        })
      );
    }
  }
}

export function* watchRequestFufillmentOfActivitySaga() {
  yield takeEvery(requestFullfillmentOfActivity.type, generateBidWorkflow);
}

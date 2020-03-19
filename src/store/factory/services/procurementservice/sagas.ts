import { takeEvery, select, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  Activity,
  ActivityType,
  TransmutationStateType
} from '../../../workflow/types';
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
  const procurementServiceProvider =
    availableProcurementServiceProviders.length > 0
      ? availableProcurementServiceProviders[0]
      : undefined;
  if (!procurementServiceProvider) {
    console.warn(
      `Unable to generate bid for activity ${activity.identity.uuid}, no procurement services available`
    );
    return; // Early return if no service providers available to bid.
  }

  if (activity.type === ActivityType.Transmutation) {
    // Check for each transition if the procurement services's end state is BasicShape, the action has an end state that is also BasicShape and that the service can
    // offer the shape required.
    const chosenTopologyTransition = procurementServiceProvider.supportedTransmutationTransitions.find(
      transition =>
        transition.end.type === TransmutationStateType.BasicShape &&
        activity.endState &&
        activity.endState.type === TransmutationStateType.BasicShape &&
        activity.endState.shape === transition.end.shape
    );
    if (chosenTopologyTransition) {
      console.log(
        `Procurement service ${procurementServiceProvider.id.uuid} will offer fullfillment for this transmutation activity. (It will not append any required input topology, as it will just require liquid assets)`
      );
      if (
        chosenTopologyTransition.start.type ===
        TransmutationStateType.LiquidAsset
      ) {
        activity.startState = chosenTopologyTransition.start;
        yield put(
          offerFullfillmentOfActivity({
            serviceProvider: procurementServiceProvider,
            activity: activity
          })
        );
      } else {
        console.error(
          `Procurement service ${procurementServiceProvider.id.uuid} has misconfigured transmutation transition start type (should be liquid asset)`
        );
      }
    }
  }
}

export function* watchRequestFufillmentOfActivitySaga() {
  yield takeEvery(requestFullfillmentOfActivity.type, generateBidWorkflow);
}

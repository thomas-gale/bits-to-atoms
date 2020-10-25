import { takeEvery, select, put, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  Activity,
  ActivityType,
  TransmutationStateType,
  TransmutationActivity,
} from '../../../workflow/types';
import {
  requestFullfillmentOfActivity,
  offerFullfillmentOfActivity,
  acceptFullfillmentOfActivity,
  updateActivity,
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
    (sp) => sp.type === ServiceType.Procurement
  ) as ProcurementService[];

  // Grab the first service provider that can bid.
  // TD: In the future service providers should be able to bid on future tasks to append to a buffer.
  const availableProcurementServiceProviders = procurementServiceProviders.filter(
    (psp) => psp.canBid
  );
  const procurementServiceProvider =
    availableProcurementServiceProviders.length > 0
      ? availableProcurementServiceProviders[0]
      : undefined;
  if (!procurementServiceProvider) {
    console.warn(
      `Unable to generate bid for activity ${activity.id}, no procurement services available`
    );
    return; // Early return if no service providers available to bid.
  }

  if (activity.type === ActivityType.Transmutation) {
    // Check for each transition if the procurement services's end state is BasicShape, the action has an end state that is also BasicShape and that the service can
    // offer the shape required.
    const chosenTopologyTransition = procurementServiceProvider.supportedTransmutationTransitions.find(
      (transition) =>
        transition.end.type === TransmutationStateType.BasicShapeType &&
        activity.endState &&
        activity.endState.type === TransmutationStateType.BasicShapeType &&
        activity.endState.shape === transition.end.shape
    );
    if (chosenTopologyTransition) {
      console.log(
        `Procurement service ${procurementServiceProvider.id} will offer fullfillment for this transmutation activity. (It will not append any required input topology, as it will just require liquid assets)`
      );
      if (
        chosenTopologyTransition.start.type ===
        TransmutationStateType.LiquidAssetType
      ) {
        activity.startState = chosenTopologyTransition.start;
        yield put(
          offerFullfillmentOfActivity({
            serviceProvider: procurementServiceProvider,
            activity: activity,
          })
        );
      } else {
        console.error(
          `Procurement service ${procurementServiceProvider.id} has misconfigured transmutation transition start type (should be liquid asset)`
        );
      }
    }
  }
}

function* executeActivityWorkflow(
  action: PayloadAction<{
    serviceProvider: ServiceProvider;
    activity: Activity;
  }>
) {
  if (action.payload.serviceProvider.type !== ServiceType.Procurement) return;
  const serviceProvider = action.payload.serviceProvider as ProcurementService;
  const activity = action.payload.activity as TransmutationActivity;
  // Started timestamp.
  activity.started = new Date();

  // Interact with virtual market and exchange the factory liquid asset for the material fixed asset to add to worshop.
  // Somehow assign the material fixed asset to this active activity / build request?
  console.log(
    `Procurement service ${serviceProvider.id} starting to execute transmutation activity ${activity.id}`
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

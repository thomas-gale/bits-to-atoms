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
import { FFFPrinter } from './types';
import { createBasicShapeTransmutationState } from '../factories';

function* generateBidWorkflow(
  requestFufillmentOfActivity: PayloadAction<Activity>
) {
  const activity = requestFufillmentOfActivity.payload;

  // When generating bids, get the fff printers from the factory's service providers.
  const serviceProviders = (yield select(
    factoryServiceProvidersSelector
  )) as ServiceProvider[];
  const fffPrinterServiceProviders = serviceProviders.filter(
    (sp) => sp.type === ServiceType.FFFPrinter
  ) as FFFPrinter[];

  // Grab the first service provider that can bid.
  // TD: In the future service providers should be able to bid on future tasks to append to a buffer.
  const availableFFFPrinterServiceProviders = fffPrinterServiceProviders.filter(
    (fffpsp) => fffpsp.canBid
  );
  const fffPrinterServiceProvider =
    availableFFFPrinterServiceProviders.length > 0
      ? availableFFFPrinterServiceProviders[0]
      : undefined;
  if (!fffPrinterServiceProvider) {
    console.warn(
      `Unable to generate bid for activity ${activity.id}, no fff printers available`
    );
    return; // Early return if no service providers available to bid.
  }

  if (activity.type === ActivityType.Transmutation) {
    // Check for each transition if the printer's end state is BasicShape, the action has an end state that is also BasicShape and that the printer can
    // offer the shape required.
    const chosenTopologyTransition = fffPrinterServiceProvider.supportedTransmutationTransitions.find(
      (transition) =>
        transition.end.type === TransmutationStateType.BasicShapeType &&
        activity.endState &&
        activity.endState.type === TransmutationStateType.BasicShapeType &&
        activity.endState.shape === transition.end.shape
    );
    if (chosenTopologyTransition) {
      console.log(
        `FFF printer service ${fffPrinterServiceProvider.id} will offer fullfillment for this transmutation activity . (Appending required input topology)`
      );
      if (
        chosenTopologyTransition.start.type ===
        TransmutationStateType.BasicShapeType
      ) {
        activity.startState = createBasicShapeTransmutationState({
          shape: chosenTopologyTransition.start.shape,
        });
        yield put(
          offerFullfillmentOfActivity({
            serviceProvider: fffPrinterServiceProvider,
            activity: activity,
          })
        );
      } else {
        console.error(
          `FFF printer service ${fffPrinterServiceProvider.id} has misconfigured TopologyTransition start type`
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
  if (action.payload.serviceProvider.type !== ServiceType.FFFPrinter) return;
  const serviceProvider = action.payload.serviceProvider as FFFPrinter;
  const activity = action.payload.activity as TransmutationActivity;

  // Started timestamp.
  activity.started = new Date();

  // Interact with virtual market and exchange the factory liquid asset for the material fixed asset to add to worshop.
  // Somehow assign the material fixed asset to this active activity / build request?
  console.log(
    `FFF printer service ${serviceProvider.id} starting to execute transmutation activity ${activity.id}`
  );
  yield delay(1000);

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

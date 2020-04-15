import { takeEvery, select, put, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  Activity,
  ActivityType,
  TransmutationStateType,
  TransmutationActivity,
  TransportationActivity,
} from '../../../workflow/types';
import {
  requestFullfillmentOfActivity,
  offerFullfillmentOfActivity,
  acceptFullfillmentOfActivity,
  updateActivity,
} from '../../slice';
import { factoryServiceProvidersSelector } from '../../selectors';
import { ServiceProvider, ServiceType } from '../types';
import { HumanWorker } from './types';
import { createBasicShapeTransmutationState } from '../factories';

function* generateBidWorkflow(
  requestFufillmentOfActivity: PayloadAction<Activity>
) {
  const activity = requestFufillmentOfActivity.payload;

  // When generating bids, get the Human workers from the factory's service providers.
  const serviceProviders = (yield select(
    factoryServiceProvidersSelector
  )) as ServiceProvider[];
  const humanServiceProviders = serviceProviders.filter(
    (sp) => sp.type === ServiceType.HumanWorker
  ) as HumanWorker[];

  // Grab the first service provider that can bid.
  // TD: In the future service providers should be able to bid on future tasks to append to a buffer.
  const availableHumanServiceProviders = humanServiceProviders.filter(
    (hsp) => hsp.canBid
  );
  const humanServiceProvider =
    availableHumanServiceProviders.length > 0
      ? availableHumanServiceProviders[0]
      : undefined;
  if (!humanServiceProvider) {
    console.warn(
      `Unable to generate bid for activity ${activity.id}, no human workers available`
    );
    return; // Early return if no service providers available to bid.
  }

  if (activity.type === ActivityType.Transportation) {
    console.log(
      `Human worker service ${humanServiceProvider.id} will offer fullfillment for this transportation activity`
    );
    yield put(
      offerFullfillmentOfActivity({
        serviceProvider: humanServiceProvider,
        activity: activity,
      })
    );
  } else if (activity.type === ActivityType.Transmutation) {
    // Check for each transition if the human worker's end state is BasicShape, the action has an end state that is also BasicShape and that the service can
    // offer the shape required.
    const chosenTopologyTransition = humanServiceProvider.supportedTransmutationTransitions.find(
      (transition) =>
        transition.end.type === TransmutationStateType.BasicShapeType &&
        activity.endState &&
        activity.endState.type === TransmutationStateType.BasicShapeType &&
        activity.endState.shape === transition.end.shape
    );
    if (chosenTopologyTransition) {
      console.log(
        `Human worker service ${humanServiceProvider.id} will offer fullfillment for this transmutation activity. (Appending required input topology)`
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
            serviceProvider: humanServiceProvider,
            activity: activity,
          })
        );
      } else {
        console.error(
          `Human worker service ${humanServiceProvider.id} has misconfigured TopologyTransition start type`
        );
      }
    }
  }
}

function* executeTransportationActivity(
  humanWorker: HumanWorker,
  transportationActivity: TransportationActivity
) {
  // Started timestamp.
  transportationActivity.started = new Date();

  console.log(
    `Human worker service ${humanWorker.id} starting to execute transportation activity ${transportationActivity.id}`
  );
  yield delay(1000);

  // Completed timestamp and update.
  transportationActivity.completed = new Date();
  yield put(updateActivity(transportationActivity));
}

function* executeTransmutationActivity(
  humanWorker: HumanWorker,
  transmutationActivity: TransmutationActivity
) {
  // Started timestamp.
  transmutationActivity.started = new Date();

  console.log(
    `Human worker service ${humanWorker.id} starting to execute transmutation activity ${transmutationActivity.id}`
  );
  yield delay(1000);

  // Completed timestamp and update.
  transmutationActivity.completed = new Date();
  yield put(updateActivity(transmutationActivity));
}

function* executeActivityWorkflow(
  action: PayloadAction<{
    serviceProvider: ServiceProvider;
    activity: Activity;
  }>
) {
  if (action.payload.serviceProvider.type !== ServiceType.HumanWorker) return;
  const serviceProvider = action.payload.serviceProvider as HumanWorker;

  switch (action.payload.activity.type) {
    case ActivityType.Transportation:
      yield executeTransportationActivity(
        serviceProvider,
        action.payload.activity
      );
      break;
    case ActivityType.Transmutation:
      yield executeTransmutationActivity(
        serviceProvider,
        action.payload.activity
      );
      break;
    default:
      console.error('Unsupported activity type for Human Worker');
      return;
  }
}

export function* watchRequestFufillmentOfActivitySaga() {
  yield takeEvery(requestFullfillmentOfActivity.type, generateBidWorkflow);
}

export function* watchAcceptFullfillmentOfActivitySaga() {
  yield takeEvery(acceptFullfillmentOfActivity.type, executeActivityWorkflow);
}

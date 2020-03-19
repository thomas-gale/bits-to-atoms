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
    sp => sp.type === ServiceType.HumanWorker
  ) as HumanWorker[];

  // Grab the first service provider that can bid.
  // TD: In the future service providers should be able to bid on future tasks to append to a buffer.
  const availableHumanServiceProviders = humanServiceProviders.filter(
    hsp => hsp.canBid
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
      `Human worker service ${humanServiceProvider.id.uuid} will offer fullfillment for this transportation activity`
    );
    yield put(
      offerFullfillmentOfActivity({
        serviceProvider: humanServiceProvider,
        activity: activity
      })
    );
  } else if (activity.type === ActivityType.Transmutation) {
    // Check for each transition if the human worker's end state is BasicShape, the action has an end state that is also BasicShape and that the service can
    // offer the shape required.
    const chosenTopologyTransition = humanServiceProvider.supportedTransmutationTransitions.find(
      transition =>
        transition.end.type === TransmutationStateType.BasicShape &&
        activity.endState &&
        activity.endState.type === TransmutationStateType.BasicShape &&
        activity.endState.shape === transition.end.shape
    );
    if (chosenTopologyTransition) {
      console.log(
        `Human worker service ${humanServiceProvider.id.uuid} will offer fullfillment for this transmutation activity. (Appending required input topology)`
      );
      if (
        chosenTopologyTransition.start.type ===
        TransmutationStateType.BasicShape
      ) {
        activity.startState = createBasicShapeTransmutationState({
          shape: chosenTopologyTransition.start.shape
        });
        yield put(
          offerFullfillmentOfActivity({
            serviceProvider: humanServiceProvider,
            activity: activity
          })
        );
      } else {
        console.error(
          `Human worker service ${humanServiceProvider.id.uuid} has misconfigured TopologyTransition start type`
        );
      }
    }
  }
}

export function* watchRequestFufillmentOfActivitySaga() {
  yield takeEvery(requestFullfillmentOfActivity.type, generateBidWorkflow);
}

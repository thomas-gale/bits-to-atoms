import {
  ActivityType,
  TransportationActivity,
  TransmutationActivity,
  StorageActivity,
  Activity,
  Workflow,
  TransmutationState
} from './types';
import { createNewIdentity } from '../common/identity/factories';
import { createVector3 } from '../common/primitive/factories';
import { MaterialType } from '../material/types';
import { Identity } from '../common/identity/types';

export function createTransportationActivity({
  identity = createNewIdentity({
    displayName: 'default-transportation-activity'
  }),
  serviceProviderId = undefined,
  started = undefined,
  completed = undefined,
  previousActivityId = undefined,
  nextActivityId = undefined,
  startLocation = createVector3(),
  endLocation = createVector3()
} = {}): TransportationActivity {
  return {
    identity,
    type: ActivityType.Transportation,
    serviceProviderId,
    started,
    completed,
    previousActivityId,
    nextActivityId,
    startLocation,
    endLocation
  };
}

export function createTransmutationActivity({
  identity = createNewIdentity({
    displayName: 'default-transmutation-activity'
  }),
  serviceProviderId = undefined as Identity | undefined,
  started = undefined as Date | undefined,
  completed = undefined as Date | undefined,
  previousActivityId = undefined as Identity | undefined,
  nextActivityId = undefined as Identity | undefined,
  material = MaterialType.SimplePolymer,
  startState = undefined as TransmutationState | undefined,
  endState = undefined as TransmutationState | undefined
} = {}): TransmutationActivity {
  return {
    identity,
    type: ActivityType.Transmutation,
    serviceProviderId,
    started,
    completed,
    previousActivityId,
    nextActivityId,
    material,
    startState,
    endState
  };
}

export function createStorageActivity({
  identity = createNewIdentity({
    displayName: 'default-storage-activity'
  }),
  serviceProviderId = undefined,
  started = undefined,
  completed = undefined,
  previousActivityId = undefined,
  nextActivityId = undefined,
  location = createVector3()
} = {}): StorageActivity {
  return {
    identity,
    type: ActivityType.Storage,
    serviceProviderId,
    started,
    completed,
    previousActivityId,
    nextActivityId,
    location
  };
}

export function createWorkflow({
  identity = createNewIdentity({
    displayName: 'default-workflow'
  }),
  activities = [] as Activity[],
  firstActivityId = undefined
} = {}): Workflow {
  return {
    identity,
    activities,
    firstActivityId
  };
}

import { createUuid } from '../common/identity/factories';
import { createVector3 } from '../common/primitive/factories';
import { MaterialType } from '../material/types';
import {
  Activity,
  ActivityType,
  StorageActivity,
  TransmutationActivity,
  TransmutationState,
  TransportationActivity,
  Workflow
} from './types';

export function createTransportationActivity({
  id = createUuid(),
  displayName = 'default-transportation-activity',
  serviceProvider = undefined,
  started = undefined,
  completed = undefined,
  previousActivity = undefined,
  nextActivity = undefined,
  startLocation = createVector3(),
  endLocation = createVector3()
} = {}): TransportationActivity {
  return {
    type: ActivityType.Transportation,
    id,
    displayName,
    serviceProvider,
    started,
    completed,
    previousActivity,
    nextActivity,
    startLocation,
    endLocation
  };
}

export function createTransmutationActivity({
  id = createUuid(),
  displayName = 'default-transmutation-activity',
  serviceProviderId = undefined as string | undefined,
  started = undefined as Date | undefined,
  completed = undefined as Date | undefined,
  previousActivityId = undefined as string | undefined,
  nextActivityId = undefined as string | undefined,
  material = MaterialType.SimplePolymer,
  startState = undefined as TransmutationState | undefined,
  endState = undefined as TransmutationState | undefined
} = {}): TransmutationActivity {
  return {
    type: ActivityType.Transmutation,
    id,
    displayName,
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
  id = createUuid(),
  displayName = 'default-storage-activity',
  serviceProviderId = undefined,
  started = undefined,
  completed = undefined,
  previousActivityId = undefined,
  nextActivityId = undefined,
  location = createVector3()
} = {}): StorageActivity {
  return {
    type: ActivityType.Storage,
    id,
    displayName,
    serviceProviderId,
    started,
    completed,
    previousActivityId,
    nextActivityId,
    location
  };
}

export function createWorkflow({
  id = createUuid(),
  displayName = 'default-workflow',
  activities = [] as Activity[],
  firstActivity = undefined as Activity | undefined
} = {}): Workflow {
  return {
    id,
    displayName,
    activities,
    firstActivity
  };
}

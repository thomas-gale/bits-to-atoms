import { BasicShape } from '../common/topology/types';
import {
  ActivityType,
  ProcurementActivity,
  TransportationActivity,
  TransmutationActivity,
  StorageActivity,
  Activity,
  Workflow,
  DispatchActivity
} from './types';
import { createNewIdentity } from '../common/identity/factories';
import { createSimplePolymerMaterial } from '../material/factories';
import { createVector3 } from '../common/primitive/factories';
import { MaterialType } from '../material/types';

export function createProcurementActivity({
  identity = createNewIdentity({
    displayName: 'default-procurement-activity'
  }),
  serviceProviderId = undefined,
  started = undefined,
  completed = undefined,
  previousActivityId = undefined,
  nextActivityId = undefined,
  material = createSimplePolymerMaterial(),
  topology = BasicShape.Spool
} = {}): ProcurementActivity {
  return {
    identity,
    type: ActivityType.Procurement,
    serviceProviderId,
    started,
    completed,
    previousActivityId,
    nextActivityId,
    material,
    topology
  };
}

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
  serviceProviderId = undefined,
  started = undefined,
  completed = undefined,
  previousActivityId = undefined,
  nextActivityId = undefined,
  material = MaterialType.SimplePolymer,
  startTopology = undefined,
  endTopology = BasicShape.Cube
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
    startTopology,
    endTopology
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

export function createDispatchActivity({
  identity = createNewIdentity({
    displayName: 'default-dispatch-activity'
  }),
  serviceProviderId = undefined,
  started = undefined,
  completed = undefined,
  previousActivityId = undefined,
  nextActivityId = undefined,
  topology = BasicShape.Cube
} = {}): DispatchActivity {
  return {
    identity,
    type: ActivityType.Dispatch,
    serviceProviderId,
    started,
    completed,
    previousActivityId,
    nextActivityId,
    topology
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

import { BasicShape } from '../common/topology/types';
import {
  ActivityType,
  MaterialAquisitionActivity,
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

export function createMaterialAquisitionActivity({
  identity = createNewIdentity({
    displayName: 'default-material-aquisition-activity'
  }),
  serviceProviderId = undefined,
  started = undefined,
  completed = undefined,
  material = createSimplePolymerMaterial(),
  quantity = 0
} = {}): MaterialAquisitionActivity {
  return {
    identity,
    type: ActivityType.MaterialAquisition,
    serviceProviderId,
    started,
    completed,
    material,
    quantity
  };
}

export function createTransportationActivity({
  identity = createNewIdentity({
    displayName: 'default-transportation-activity'
  }),
  serviceProviderId = undefined,
  started = undefined,
  completed = undefined,
  startLocation = createVector3(),
  endLocation = createVector3()
} = {}): TransportationActivity {
  return {
    identity,
    type: ActivityType.Transportation,
    serviceProviderId,
    started,
    completed,
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
  material = MaterialType.SimplePolymer,
  startTopology = BasicShape.Spool,
  endTopology = BasicShape.Cube
} = {}): TransmutationActivity {
  return {
    identity,
    type: ActivityType.Transmutation,
    serviceProviderId,
    started,
    completed,
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
  location = createVector3()
} = {}): StorageActivity {
  return {
    identity,
    type: ActivityType.Storage,
    serviceProviderId,
    started,
    completed,
    location
  };
}

export function createDispatchActivity({
  identity = createNewIdentity({
    displayName: 'default-dispatch-activity'
  }),
  serviceProviderId = undefined,
  started = undefined,
  completed = undefined
} = {}): DispatchActivity {
  return {
    identity,
    type: ActivityType.Dispatch,
    serviceProviderId,
    started,
    completed
  };
}

export function createWorkflow({
  identity = createNewIdentity({
    displayName: 'default-workflow'
  }),
  activities = [] as Activity[]
} = {}): Workflow {
  return {
    identity,
    activities
  };
}

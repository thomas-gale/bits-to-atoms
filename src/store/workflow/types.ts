import { Identity } from '../common/identity/types';
import { Vector3 } from '../common/primitive/types';
import { BasicShape } from '../common/topology/types';
import { Material, MaterialType } from '../material/types';

export enum ActivityType {
  Procurement = 'Procurement',
  Transportation = 'Transportation',
  Transmutation = 'Transmutation',
  Storage = 'Storage',
  Dispatch = 'Dispatch'
}

interface BaseActivity {
  identity: Identity;
  type: ActivityType;
  serviceProviderId: Identity | undefined;
  started: Date | undefined;
  completed: Date | undefined;
  previousActivityId: Identity | undefined;
  nextActivityId: Identity | undefined;
}

export interface ProcurementActivity extends BaseActivity {
  type: ActivityType.Procurement;
  material: Material;
  topology: BasicShape;
}

export interface TransportationActivity extends BaseActivity {
  type: ActivityType.Transportation;
  startLocation: Vector3;
  endLocation: Vector3;
}

export interface TransmutationActivity extends BaseActivity {
  type: ActivityType.Transmutation;
  material: MaterialType;
  startTopology: BasicShape | undefined;
  endTopology: BasicShape;
}

export interface StorageActivity extends BaseActivity {
  type: ActivityType.Storage;
  location: Vector3;
}

export interface DispatchActivity extends BaseActivity {
  type: ActivityType.Dispatch;
  topology: BasicShape;
}

export type Activity =
  | ProcurementActivity
  | TransportationActivity
  | TransmutationActivity
  | StorageActivity
  | DispatchActivity;

export interface Workflow {
  identity: Identity;
  activities: Activity[];
  firstActivityId: Identity | undefined;
}

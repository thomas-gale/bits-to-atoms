import { Identity } from '../common/identity/types';
import { Vector3 } from '../common/primitive/types';
import { BasicShape } from '../common/topology/types';
import { Material } from '../material/types';

export enum ActivityType {
  MaterialAquisition,
  Transportation,
  Transmutation,
  Storage
}

interface BaseActivity {
  identity: Identity;
  type: ActivityType;
  serviceProviderId: Identity | undefined;
  started: Date | undefined;
  completed: Date | undefined;
}

export interface MaterialAquisitionActivity extends BaseActivity {
  material: Material;
  quantity: number;
}

export interface TransportationActivity extends BaseActivity {
  startLocation: Vector3;
  endLocation: Vector3;
}

export interface TransmutationActivity extends BaseActivity {
  startTopology: BasicShape;
  endTopology: BasicShape;
}

export interface StorageActivity extends BaseActivity {
  location: Vector3;
}

export type Activity =
  | MaterialAquisitionActivity
  | TransportationActivity
  | TransmutationActivity
  | StorageActivity;

export interface Workflow {
  identity: Identity;
  activities: Activity[];
}

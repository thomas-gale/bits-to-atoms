import { Identity } from '../common/identity/types';
import { Vector3 } from '../common/primitive/types';
import { BasicShape } from '../common/topology/types';
import { Material, MaterialType } from '../material/types';

export enum ActivityType {
  MaterialAquisition = 'MaterialAquisition',
  Transportation = 'Transportation',
  Transmutation = 'Transmutation',
  Storage = 'Storage'
}

interface BaseActivity {
  identity: Identity;
  type: ActivityType;
  serviceProviderId: Identity | undefined;
  started: Date | undefined;
  completed: Date | undefined;
}

export interface MaterialAquisitionActivity extends BaseActivity {
  type: ActivityType.MaterialAquisition;
  material: Material;
  quantity: number;
}

export interface TransportationActivity extends BaseActivity {
  type: ActivityType.Transportation;
  startLocation: Vector3;
  endLocation: Vector3;
}

export interface TransmutationActivity extends BaseActivity {
  type: ActivityType.Transmutation;
  material: MaterialType;
  startTopology: BasicShape;
  endTopology: BasicShape;
}

export interface StorageActivity extends BaseActivity {
  type: ActivityType.Storage;
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

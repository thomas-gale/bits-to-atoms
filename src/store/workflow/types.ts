import { Identity } from '../common/identity/types';
import { ServiceProvider } from '../factory/services/types';
import { Vector3 } from 'three/src/math/Vector3';
import { Material } from 'three';

export enum ActivityType {
  MaterialAquisition,
  Transportation,
  Transmutation,
  Preparation
}

interface BaseActivity {
  identity: Identity;
  type: ActivityType;
  serviceProvider: ServiceProvider;
  started: Date;
  completed: Date;
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
  startTopology: number;
  endShape: number;
}

export type Activity = TransportationActivity;

export interface Workflow {
  identity: Identity;
  activities: Activity[];
}

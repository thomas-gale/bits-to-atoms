import { Identity } from '../common/identity/types';
import { Vector3 } from '../common/primitive/types';
import { BasicShape } from '../common/topology/types';
import { MaterialType } from '../material/types';
import { LiquidAsset } from '../economic/types';

export enum ActivityType {
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
  previousActivityId: Identity | undefined;
  nextActivityId: Identity | undefined;
}

export interface TransportationActivity extends BaseActivity {
  type: ActivityType.Transportation;
  startLocation: Vector3;
  endLocation: Vector3;
}

export enum TransmutationStateType {
  BasicShapeType = 'BasicShapeType',
  LiquidAssetType = 'LiquidAssetType'
}

export interface BasicShapeTransmutationState {
  type: TransmutationStateType.BasicShapeType;
  shape: BasicShape;
}

export interface LiquidAssetTransmutationState {
  type: TransmutationStateType.LiquidAssetType;
  liquidAsset: LiquidAsset;
}

export type TransmutationState =
  | BasicShapeTransmutationState
  | LiquidAssetTransmutationState;

export interface TransmutationActivity extends BaseActivity {
  type: ActivityType.Transmutation;
  material: MaterialType;
  startState: TransmutationState | undefined;
  endState: TransmutationState | undefined;
}

export interface StorageActivity extends BaseActivity {
  type: ActivityType.Storage;
  location: Vector3;
}

export type Activity =
  | TransportationActivity
  | TransmutationActivity
  | StorageActivity;

export interface Workflow {
  identity: Identity;
  activities: Activity[];
  firstActivityId: Identity | undefined;
}

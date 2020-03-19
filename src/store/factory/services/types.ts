import { Entity } from '../entity/types';
import { MaterialType } from '../../material/types';
import { Cuboid } from '../../common/primitive/types';
import { LiquidAsset } from '../../economic/types';
import {
  ActivityType,
  Activity,
  TransmutationState
} from '../../workflow/types';

export enum ServiceType {
  Procurement = 'Procurement',
  Floorspace = 'Floorspace',
  HumanWorker = 'HumanWorker',
  FFFPrinter = 'FFFPrinter',
  Dispatch = 'Dispatch'
}

// This any is required to allow arbitary mapping from Serivce provider parameters in UI forms to object values.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BaseServiceProvider extends Entity<any> {
  type: ServiceType;
  capabilities: ActivityType[];
  canBid: boolean;
  currentActivity: Activity | undefined;
  currentCostPerTime: LiquidAsset;
}

export interface TransmutationTransition {
  start: TransmutationState;
  end: TransmutationState;
}

export interface TransmutationServiceProvider extends BaseServiceProvider {
  supportedTransmutationTransitions: TransmutationTransition[];
  supportedMaterials: MaterialType[];
  outputVolume: Cuboid | undefined;
}

export interface TransportServiceProvider extends BaseServiceProvider {
  capactityMass: number;
  movementVelocity: number;
}

export type StorageServiceProvider = BaseServiceProvider;

export type ServiceProvider =
  | TransmutationServiceProvider
  | TransportServiceProvider
  | StorageServiceProvider;

import { Entity } from '../entity/types';
import { MaterialType } from '../../common/material/types';
import { Cuboid } from '../../common/primitive/types';
import { LiquidAsset } from '../../economic/types';

export enum ServiceType {
  Floorspace = 'Floorspace',
  HumanWorker = 'HumanWorker',
  FFFPrinter = 'FFFPrinter'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BaseServiceProvider<T = any>
  extends Entity<ServiceType | LiquidAsset | T> {
  type: ServiceType;
  currentCostPerTime: LiquidAsset;
}

export type StorageServiceProvider = BaseServiceProvider;

export interface TransportServiceProvider extends BaseServiceProvider {
  capactityMass: number;
  movementVelocity: number;
}

export interface TransmutationServiceProvider extends BaseServiceProvider {
  supportedMaterials: MaterialType[];
  outputVolume: Cuboid;
}

export type ServiceProvider =
  | StorageServiceProvider
  | TransportServiceProvider
  | TransmutationServiceProvider;

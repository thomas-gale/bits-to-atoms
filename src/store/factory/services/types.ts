import { Entity } from '../entity/types';
import { MaterialType } from '../../common/material/types';
import { Cuboid } from '../../common/primitive/types';

export enum ServiceType {
  Floorspace = 'Floorspace',
  HumanWorker = 'HumanWorker',
  FFFPrinter = 'FFFPrinter'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BaseServiceProvider<T = any> extends Entity<ServiceType | T> {
  type: ServiceType;
}

export interface StorageServiceProvider extends BaseServiceProvider {
  costPerVolPerTime: number;
}

export interface TransportServiceProvider extends BaseServiceProvider {
  costPerTime: number;
  capactityMass: number;
  movementVelocity: number;
}

export interface TransmutationServiceProvider extends BaseServiceProvider {
  costPerTime: number;
  supportedMaterials: MaterialType[];
  outputVolume: Cuboid;
}

export type ServiceProvider =
  | StorageServiceProvider
  | TransportServiceProvider
  | TransmutationServiceProvider;

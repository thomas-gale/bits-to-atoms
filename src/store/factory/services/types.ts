import { Entity } from '../entity/types';
import { MaterialType } from '../../common/material/types';
import { Cuboid } from '../../common/primitive/types';

export enum ServiceType {
  Floorspace = 'Floorspace',
  HumanWorker = 'HumanWorker',
  FFFPrinter = 'FFFPrinter'
}

interface BaseServiceProvider<T = never> extends Entity<ServiceType | T> {
  type: ServiceType;
}

export interface StorageServiceProvider
  extends BaseServiceProvider<number | any> {
  costPerVolPerTime: number;
}

export interface TransportServiceProvider
  extends BaseServiceProvider<number | any> {
  costPerTime: number;
  capactityMass: number;
  movementVelocity: number;
}

export interface TransmutationServiceProvider
  extends BaseServiceProvider<number | MaterialType[] | Cuboid | any> {
  costPerTime: number;
  supportedMaterials: MaterialType[];
  outputVolume: Cuboid;
}

export type ServiceProvider =
  | StorageServiceProvider
  | TransportServiceProvider
  | TransmutationServiceProvider;

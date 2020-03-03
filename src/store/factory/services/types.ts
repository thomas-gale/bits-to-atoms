import { Entity } from '../types';
import { MaterialType } from '../material/types';
import { Cuboid } from '../../common/types';

export enum ServiceType {
  Floorspace = 'Floorspace',
  HumanWorker = 'HumanWorker',
  FFFPrinter = 'FFFPrinter'
}

export interface ServiceProvider extends Entity {
  type: ServiceType;
  costDollarPerSecond: number;
}

export interface StorageServiceProvider extends ServiceProvider {
  storageEntity: Entity;
}

export interface TransportServiceProvider extends ServiceProvider {
  capactityKg: number;
  movementSpeedmps: number;
}

export interface TransformationServiceProvider extends ServiceProvider {
  supportedMaterials: MaterialType[];
  outputVolumem3: Cuboid;
}

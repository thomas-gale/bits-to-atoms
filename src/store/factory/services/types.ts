import { Entity } from '../types';
import { MaterialType } from '../material/types';
import { Cuboid } from '../../common/types';
import { FloorSpace } from './floorspace/types';
import { HumanWorker } from './humanworker/types';
import { FFFPrinter } from './fffprinter/types';

export enum ServiceType {
  Floorspace = 'Floorspace',
  HumanWorker = 'HumanWorker',
  FFFPrinter = 'FFFPrinter'
}

interface BaseServiceProvider extends Entity {
  type: ServiceType;
}

export interface StorageServiceProvider extends BaseServiceProvider {
  costDollarPerm3PerSecond: number;
}

export interface TransportServiceProvider extends BaseServiceProvider {
  costDollarPerSecond: number;
  capactityKg: number;
  movementSpeedmps: number;
}

export interface TransmutationServiceProvider extends BaseServiceProvider {
  costDollarPerSecond: number;
  supportedMaterials: MaterialType[];
  outputVolumem3: Cuboid;
}

export type ServiceProvider = FloorSpace | HumanWorker | FFFPrinter;

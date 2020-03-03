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

export type ServiceProvider = FloorSpace | HumanWorker | FFFPrinter;

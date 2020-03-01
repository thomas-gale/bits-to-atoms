import { Entity } from '../types';
import { SimplePolymer } from '../material/types';
import { Cuboid } from '../../common/types';

export interface ServiceProvider extends Entity {
  costPerSecond: number;
}

export interface StorageServiceProvider extends ServiceProvider {
  storageEntity: Entity;
}

export interface TransportServiceProvider extends ServiceProvider {
  capactity: number;
  movementSpeed: number;
}

export interface TransformationServiceProvider extends ServiceProvider {
  rawMaterial: SimplePolymer;
  outputVolume: Cuboid;
}

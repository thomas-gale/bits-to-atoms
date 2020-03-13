import { Entity } from '../entity/types';
import { MaterialType } from '../../material/types';
import { Cuboid } from '../../common/primitive/types';
import { LiquidAsset } from '../../economic/types';
import { BasicShape } from '../../common/topology/types';

export enum ServiceType {
  Floorspace = 'Floorspace',
  HumanWorker = 'HumanWorker',
  FFFPrinter = 'FFFPrinter'
}

// This any is required to allow arbitary mapping from Serivce provider parameters in UI forms to object values.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BaseServiceProvider extends Entity<any> {
  type: ServiceType;
  currentCostPerTime: LiquidAsset;
}

export type StorageServiceProvider = BaseServiceProvider;

export interface TransportServiceProvider extends BaseServiceProvider {
  capactityMass: number;
  movementVelocity: number;
}

export interface TransmutationServiceProvider extends BaseServiceProvider {
  supportedInputTopologies: BasicShape[];
  supportedOutputTopologies: BasicShape[];
  supportedMaterials: MaterialType[];
  outputVolume: Cuboid;
}

export type ServiceProvider =
  | StorageServiceProvider
  | TransportServiceProvider
  | TransmutationServiceProvider;

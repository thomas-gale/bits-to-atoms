import { StorageServiceProvider, ServiceType } from '../types';

export interface FloorSpace extends StorageServiceProvider {
  type: ServiceType.Floorspace;
}

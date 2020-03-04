import {
  Identity,
  Vector3,
  Quaternion,
  Cuboid
} from '../common/primitive/types';
import { ServiceProvider } from './services/types';

export interface Entity {
  id: Identity;
  location: Vector3;
  orientation: Quaternion;
  bounds: Cuboid;
}

export interface Factory extends Entity {
  serviceProviders: ServiceProvider[];
}

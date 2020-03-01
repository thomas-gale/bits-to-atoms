import { Identity, Vector3, Quaternion, Cuboid } from '../common/types';
import { FloorSpace } from './services/floorspace/types';

export interface Entity {
  id: Identity;
  location: Vector3;
  orientation: Quaternion;
  bounds: Cuboid;
}

export interface Factory extends Entity {
  floorSpace: FloorSpace;
}

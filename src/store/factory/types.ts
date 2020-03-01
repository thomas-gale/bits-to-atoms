import { Identity, Vector3, Quaternion, Cuboid } from '../common/types';

export interface Entity {
  id: Identity;
  location: Vector3;
  orientation: Quaternion;
  bounds: Cuboid;
}

export interface Factory extends Entity {
  floorSpace: FloorSpace;
}

export interface FloorSpace extends Entity {
  xLength: number;
  yLength: number;
}

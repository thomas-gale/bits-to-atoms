import { Identity } from '../../common/identity/types';
import { Vector3, Quaternion, Cuboid } from '../../common/primitive/types';

export interface Entity {
  id: Identity;
  location: Vector3;
  orientation: Quaternion;
  bounds: Cuboid;
}
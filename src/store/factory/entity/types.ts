import { Identity } from '../../common/identity/types';
import {
  Vector3,
  Quaternion,
  Cuboid,
  LooseObject
} from '../../common/primitive/types';

export interface Entity<T = never>
  extends LooseObject<Identity | Vector3 | Quaternion | Cuboid | T> {
  id: Identity;
  location: Vector3;
  orientation: Quaternion;
  bounds: Cuboid;
}

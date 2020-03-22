import { Identity } from '../../common/identity/types';
import {
  Vector3,
  Quaternion,
  Cuboid,
  LooseObject
} from '../../common/primitive/types';

export interface Entity<T = never>
  extends Identity,
    LooseObject<string | Vector3 | Quaternion | Cuboid | T> {
  location: Vector3;
  orientation: Quaternion;
  bounds: Cuboid;
}

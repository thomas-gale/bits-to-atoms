import {
  Identity,
  Vector3,
  Quaternion,
  Cuboid
} from '../common/primitive/types';
import { Entity } from './types';
import {
  createNewIdentity,
  createVector3,
  createQuaternion,
  createCuboid
} from '../common/primitive/factories';

export function createEntity(
  id: Identity = createNewIdentity('default-entity'),
  location: Vector3 = createVector3(),
  orientation: Quaternion = createQuaternion(),
  bounds: Cuboid = createCuboid()
): Entity {
  return {
    id,
    location,
    orientation,
    bounds
  };
}

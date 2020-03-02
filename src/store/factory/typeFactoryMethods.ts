import { Identity, Vector3, Quaternion, Cuboid } from '../common/types';
import { Entity } from './types';
import {
  createExistingIdentity,
  createVector3,
  createQuaternion,
  createCuboid
} from '../common/typeFactoryMethods';

export function createEntity(
  id: Identity = createExistingIdentity(),
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

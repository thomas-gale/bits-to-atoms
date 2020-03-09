import { Entity } from './types';
import { createNewIdentity } from '../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../common/primitive/factories';

export function createEntity({
  id = createNewIdentity({ displayName: 'default-entity' }),
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid()
} = {}): Entity {
  return {
    id,
    location,
    orientation,
    bounds
  };
}

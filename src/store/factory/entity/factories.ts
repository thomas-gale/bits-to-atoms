import { createUuid } from '../../common/identity/factories';
import {
  createCuboid,
  createQuaternion,
  createVector3,
} from '../../common/primitive/factories';
import { Entity } from './types';

export function createEntity({
  id = createUuid(),
  displayName = 'default-entity',
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid(),
} = {}): Entity {
  return {
    id,
    displayName,
    location,
    orientation,
    bounds,
  };
}

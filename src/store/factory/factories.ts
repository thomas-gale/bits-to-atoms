import { Identity } from '../common/identity/types';
import { Vector3, Quaternion, Cuboid } from '../common/primitive/types';
import { ServiceProvider } from './services/types';
import { Entity, Factory } from './types';
import { createNewIdentity } from '../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../common/primitive/factories';
import { createFloorSpace } from './services/floorspace/factories';
import { createHumanWorker } from './services/humanworker/factories';

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

export function createFactory(
  id: Identity = createNewIdentity('default-factory'),
  location: Vector3 = createVector3(),
  orientation: Quaternion = createQuaternion(),
  bounds: Cuboid = createCuboid(),
  serviceProviders: ServiceProvider[] = [
    createFloorSpace(),
    createHumanWorker()
  ]
): Factory {
  return {
    id,
    location,
    orientation,
    bounds,
    serviceProviders
  };
}

import { Identity } from '../common/identity/types';
import { Vector3, Quaternion, Cuboid } from '../common/primitive/types';
import { ServiceProvider } from './services/types';
import { Entity } from './entity/types';
import { Factory } from './types';
import { createNewIdentity } from '../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../common/primitive/factories';
import { createFloorSpace } from './services/floorspace/factories';
import { createHumanWorker } from './services/humanworker/factories';

export function createFactory(
  identity: Identity = createNewIdentity('default-factory'),
  serviceProviders: ServiceProvider[] = [
    createFloorSpace(),
    createHumanWorker()
  ]
): Factory {
  return {
    identity,
    serviceProviders
  };
}

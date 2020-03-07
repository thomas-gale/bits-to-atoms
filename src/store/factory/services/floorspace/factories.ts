import { Identity } from '../../../common/identity/types';
import { Vector3, Quaternion, Cuboid } from '../../../common/primitive/types';
import { createNewIdentity } from '../../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/primitive/factories';
import { ServiceType } from '../types';
import { FloorSpace } from './types';

export const createFloorSpace = (
  id: Identity = createNewIdentity('default-floorspace'),
  location: Vector3 = createVector3(),
  orientation: Quaternion = createQuaternion(),
  bounds: Cuboid = createCuboid(
    createVector3(-4, -2, 0),
    createVector3(4, 2, 2)
  ),
  costPerVolPerTime = 1e-6
): FloorSpace => {
  return {
    type: ServiceType.Floorspace,
    id,
    location,
    orientation,
    bounds,
    costPerVolPerTime
  };
};

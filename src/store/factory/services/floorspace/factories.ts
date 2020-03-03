import { Identity, Vector3, Quaternion, Cuboid } from '../../../common/types';
import { FloorSpace } from './types';
import {
  createNewIdentity,
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/factories';
import { ServiceType } from '../types';

export const createFloorSpace = (
  id: Identity = createNewIdentity('default-floorspace'),
  location: Vector3 = createVector3(),
  orientation: Quaternion = createQuaternion(),
  bounds: Cuboid = createCuboid(
    createVector3(-2, -1, 0),
    createVector3(2, 1, 2)
  ),
  costDollarPerm3PerSecond = 1e-6
): FloorSpace => {
  return {
    type: ServiceType.Floorspace,
    id,
    location,
    orientation,
    bounds,
    costDollarPerm3PerSecond,
    xLength: 4, // deprecated
    yLength: 2 // deprecated
  };
};

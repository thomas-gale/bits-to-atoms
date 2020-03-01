import { Vector3, Identity } from '../../../common/types';
import { FloorSpace } from './types';
import {
  createExistingIdentity,
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/typeFactoryMethods';

export const createFloorSpace = (
  id: Identity = createExistingIdentity('Floorspace', 'floorspace-default'),
  min: Vector3 = createVector3(-2, -1, 0),
  max: Vector3 = createVector3(2, 1, 2)
): FloorSpace => {
  return {
    id,
    location: createVector3(),
    orientation: createQuaternion(),
    bounds: createCuboid(min, max),
    xLength: max.x - min.x,
    yLength: max.y - min.y
  };
};

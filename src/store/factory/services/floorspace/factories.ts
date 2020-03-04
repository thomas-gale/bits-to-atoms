import { Identity } from '../../../common/identity/types';
import { Vector3, Quaternion, Cuboid } from '../../../common/primitive/types';
import { createNewIdentity, createExistingIdentity } from '../../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/primitive/factories';
import { ServiceType, ServiceProvider } from '../types';
import { createEntity } from '../../entity/factories';
import { createNumberParameter } from '../../../common/parameter/factories';

export const createFloorSpace = (
  id: Identity = createNewIdentity('default-floorspace'),
  location: Vector3 = createVector3(),
  orientation: Quaternion = createQuaternion(),
  bounds: Cuboid = createCuboid(
    createVector3(-2, -1, 0),
    createVector3(2, 1, 2)
  ),
  costPerVolPerTime = 1e-6
): ServiceProvider => {
  const entity = createEntity(id, location, orientation, bounds)
  return {
    id,
    type: ServiceType.Floorspace,
    parameters: [
      ...entity.parameters,
      createNumberParameter(
        createExistingIdentity('cost Per Vol Per Time', 'costPerVolPerTime'),
        '$/m^3/s',
        costPerVolPerTime
      ),
    ]
  };
};

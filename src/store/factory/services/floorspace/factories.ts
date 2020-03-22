import { createUuid } from '../../../common/identity/factories';
import {
  createCuboid,
  createQuaternion,
  createVector3
} from '../../../common/primitive/factories';
import { createLiquidAsset } from '../../../economic/factories';
import { ActivityType } from '../../../workflow/types';
import { ServiceType } from '../types';
import { FloorSpace } from './types';

export const createFloorSpace = ({
  id = createUuid(),
  displayName = 'default-floorspace',
  capabilities = [ActivityType.Storage],
  canBid = true,
  currentActivity = undefined,
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid({
    min: createVector3({ x: -4, y: -2 }),
    max: createVector3({ x: 4, y: 2, z: 2 })
  }),
  currentCostPerTime = createLiquidAsset({ dollars: 1e-6 })
} = {}): FloorSpace => {
  return {
    type: ServiceType.Floorspace,
    id,
    displayName,
    capabilities,
    canBid,
    currentActivity,
    location,
    orientation,
    bounds,
    currentCostPerTime
  };
};

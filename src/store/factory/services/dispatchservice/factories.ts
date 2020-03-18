import { ServiceType } from '../types';
import { DispatchService } from './types';

import { createNewIdentity } from '../../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/primitive/factories';
import { createLiquidAsset } from '../../../economic/factories';
import { ActivityType } from '../../../workflow/types';
import { BasicShape } from '../../../common/topology/types';

export function createDispatchService({
  capabilities = [ActivityType.Dispatch],
  canBid = true,
  currentActivity = undefined,
  id = createNewIdentity({ displayName: 'default-dispatch-service' }),
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid(),
  currentCostPerTime = createLiquidAsset({ dollars: 1e-6 }),
  supportedTopologies = [BasicShape.Cube, BasicShape.Cylinder]
} = {}): DispatchService {
  return {
    type: ServiceType.Dispatch,
    capabilities,
    canBid,
    currentActivity,
    id,
    location,
    orientation,
    bounds,
    currentCostPerTime,
    supportedTopologies
  };
}

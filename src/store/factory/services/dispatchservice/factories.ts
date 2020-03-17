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

export function createDispatchService({
  capabilities = [ActivityType.Dispatch],
  currentActivity = undefined,
  id = createNewIdentity({ displayName: 'default-dispatch-service' }),
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid(),
  currentCostPerTime = createLiquidAsset({ dollars: 1e-6 })
} = {}): DispatchService {
  return {
    type: ServiceType.Dispatch,
    capabilities,
    currentActivity,
    id,
    location,
    orientation,
    bounds,
    currentCostPerTime
  };
}

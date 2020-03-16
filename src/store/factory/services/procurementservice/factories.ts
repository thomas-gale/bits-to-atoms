import { ServiceType } from '../types';
import { ProcurementService } from './types';

import { createNewIdentity } from '../../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/primitive/factories';
import { createLiquidAsset } from '../../../economic/factories';
import { ActivityType } from '../../../workflow/types';

export function createProcurementService({
  capabilities = [ActivityType.Dispatch],
  id = createNewIdentity({ displayName: 'default-dispatch-service' }),
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid(),
  currentCostPerTime = createLiquidAsset({ dollars: 1e-6 })
} = {}): ProcurementService {
  return {
    type: ServiceType.Procurement,
    capabilities,
    id,
    location,
    orientation,
    bounds,
    currentCostPerTime
  };
}

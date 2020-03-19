import { ServiceType } from '../types';
import { ProcurementService } from './types';
import { ActivityType } from '../../../workflow/types';
import { BasicShape } from '../../../common/topology/types';
import { MaterialType } from '../../../material/types';

import { createNewIdentity } from '../../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/primitive/factories';
import { createLiquidAsset } from '../../../economic/factories';
import {
  createTransmutationTransition,
  createBasicShapeTransmutationState,
  createLiquidAssetTransmutationState
} from '../factories';

export function createProcurementService({
  capabilities = [ActivityType.Transmutation],
  canBid = true,
  currentActivity = undefined,
  id = createNewIdentity({ displayName: 'default-dispatch-service' }),
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid(),
  currentCostPerTime = createLiquidAsset({ dollars: 1e-6 }),
  supportedTransmutationTransitions = [
    createTransmutationTransition({
      start: createLiquidAssetTransmutationState({
        liquidAsset: createLiquidAsset({ dollars: 2 })
      }),
      end: createBasicShapeTransmutationState({ shape: BasicShape.Spool })
    })
  ],
  supportedMaterials = [MaterialType.SimplePolymer],
  outputVolume = undefined
} = {}): ProcurementService {
  return {
    type: ServiceType.Procurement,
    capabilities,
    canBid,
    currentActivity,
    id,
    location,
    orientation,
    bounds,
    currentCostPerTime,
    supportedTransmutationTransitions,
    supportedMaterials,
    outputVolume
  };
}

import { createUuid } from '../../../common/identity/factories';
import {
  createCuboid,
  createQuaternion,
  createVector3
} from '../../../common/primitive/factories';
import { BasicShape } from '../../../common/topology/types';
import { createLiquidAsset } from '../../../economic/factories';
import { MaterialType } from '../../../material/types';
import { ActivityType } from '../../../workflow/types';
import {
  createBasicShapeTransmutationState,
  createLiquidAssetTransmutationState,
  createTransmutationTransition
} from '../factories';
import { ServiceType } from '../types';
import { ProcurementService } from './types';

export function createProcurementService({
  id = createUuid(),
  displayName = 'default-procurement-service',
  capabilities = [ActivityType.Transmutation],
  canBid = true,
  currentActivity = undefined,
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
    id,
    displayName,
    capabilities,
    canBid,
    currentActivity,
    location,
    orientation,
    bounds,
    currentCostPerTime,
    supportedTransmutationTransitions,
    supportedMaterials,
    outputVolume
  };
}

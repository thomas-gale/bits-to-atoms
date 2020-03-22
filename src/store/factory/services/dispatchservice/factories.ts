import { ServiceType } from '../types';
import { DispatchService } from './types';

import { createUuid } from '../../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/primitive/factories';
import { createLiquidAsset } from '../../../economic/factories';
import { ActivityType } from '../../../workflow/types';
import { BasicShape } from '../../../common/topology/types';
import { MaterialType } from '../../../material/types';
import {
  createTransmutationTransition,
  createBasicShapeTransmutationState,
  createLiquidAssetTransmutationState
} from '../factories';

export function createDispatchService({
  id = createUuid(),
  displayName = 'default-dispatch-service',
  capabilities = [ActivityType.Transmutation],
  canBid = true,
  currentActivity = undefined,
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid(),
  currentCostPerTime = createLiquidAsset({ dollars: 1e-6 }),
  supportedTransmutationTransitions = [
    createTransmutationTransition({
      start: createBasicShapeTransmutationState({ shape: BasicShape.Cube }),
      end: createLiquidAssetTransmutationState({
        liquidAsset: createLiquidAsset({ dollars: 5 })
      })
    }),
    createTransmutationTransition({
      start: createBasicShapeTransmutationState({ shape: BasicShape.Cylinder }),
      end: createLiquidAssetTransmutationState({
        liquidAsset: createLiquidAsset({ dollars: 10 })
      })
    })
  ],
  supportedMaterials = [MaterialType.SimplePolymer],
  outputVolume = undefined
} = {}): DispatchService {
  return {
    type: ServiceType.Dispatch,
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

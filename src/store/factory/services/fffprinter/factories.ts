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
  createTransmutationTransition
} from '../factories';
import { ServiceType } from '../types';
import { FFFPrinter } from './types';

export function createFFFPrinter({
  id = createUuid(),
  displayName = 'default-fff-printer',
  capabilities = [ActivityType.Transmutation],
  canBid = true,
  currentActivity = undefined,
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid({
    min: createVector3({ x: -0.5, y: -0.5 }),
    max: createVector3({ x: 0.5, y: 0.5, z: 1.0 })
  }),
  currentCostPerTime = createLiquidAsset({ dollars: 1e-6 }),
  supportedTransmutationTransitions = [
    createTransmutationTransition({
      start: createBasicShapeTransmutationState({ shape: BasicShape.Spool }),
      end: createBasicShapeTransmutationState({ shape: BasicShape.RoughCube })
    }),
    createTransmutationTransition({
      start: createBasicShapeTransmutationState({ shape: BasicShape.Spool }),
      end: createBasicShapeTransmutationState({
        shape: BasicShape.RoughCylinder
      })
    })
  ],
  supportedMaterials = [MaterialType.SimplePolymer],
  outputVolume = createCuboid()
} = {}): FFFPrinter {
  return {
    type: ServiceType.FFFPrinter,
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

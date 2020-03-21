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
import { HumanWorker } from './types';

export function createHumanWorker({
  id = createUuid(),
  displayName = 'default-humanworker',
  capabilities = [ActivityType.Transportation, ActivityType.Transmutation],
  canBid = true,
  currentActivity = undefined,
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid({
    min: createVector3({ x: -0.2, y: -0.2 }),
    max: createVector3({ x: 0.2, y: 0.2, z: 1.5 })
  }),
  currentCostPerTime = createLiquidAsset({ dollars: 1e-6 }),
  capactityMass = 5,
  movementVelocity = 0.5,
  supportedTransmutationTransitions = [
    createTransmutationTransition({
      start: createBasicShapeTransmutationState({
        shape: BasicShape.RoughCube
      }),
      end: createBasicShapeTransmutationState({ shape: BasicShape.Cube })
    }),
    createTransmutationTransition({
      start: createBasicShapeTransmutationState({
        shape: BasicShape.RoughCylinder
      }),
      end: createBasicShapeTransmutationState({
        shape: BasicShape.Cylinder
      })
    })
  ],
  supportedMaterials = [MaterialType.SimplePolymer],
  outputVolume = createCuboid()
} = {}): HumanWorker {
  return {
    type: ServiceType.HumanWorker,
    id,
    displayName,
    capabilities,
    canBid,
    currentActivity,
    location,
    orientation,
    bounds,
    currentCostPerTime,
    capactityMass,
    movementVelocity,
    supportedTransmutationTransitions,
    supportedMaterials,
    outputVolume
  };
}

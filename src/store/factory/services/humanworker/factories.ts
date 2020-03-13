import { MaterialType } from '../../../material/types';
import { ServiceType } from '../types';
import { HumanWorker } from './types';

import { createNewIdentity } from '../../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/primitive/factories';
import { createLiquidAsset } from '../../../economic/factories';
import { BasicShape } from '../../../common/topology/types';

export function createHumanWorker({
  id = createNewIdentity({ displayName: 'default-humanworker' }),
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid({
    min: createVector3({ x: -0.2, y: -0.2 }),
    max: createVector3({ x: 0.2, y: 0.2, z: 1.5 })
  }),
  currentCostPerTime = createLiquidAsset({ dollars: 1e-4 }),
  capactityMass = 5,
  movementVelocity = 0.5,
  supportedInputTopologies = [BasicShape.RoughCube, BasicShape.RoughCylinder],
  supportedOutputTopologies = [BasicShape.Cube, BasicShape.Cylinder],
  supportedMaterials = [MaterialType.SimplePolymer],
  outputVolume = createCuboid()
} = {}): HumanWorker {
  return {
    type: ServiceType.HumanWorker,
    id,
    location,
    orientation,
    bounds,
    currentCostPerTime,
    capactityMass,
    movementVelocity,
    supportedInputTopologies,
    supportedOutputTopologies,
    supportedMaterials,
    outputVolume
  };
}

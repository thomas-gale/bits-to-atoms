import { MaterialType } from '../../../material/types';
import { ServiceType } from '../types';
import { FFFPrinter } from './types';

import { createNewIdentity } from '../../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/primitive/factories';
import { createLiquidAsset } from '../../../economic/factories';
import { BasicShape } from '../../../common/topology/types';

export function createFFFPrinter({
  id = createNewIdentity({ displayName: 'default-fff-printer' }),
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid({
    min: createVector3({ x: -0.5, y: -0.5 }),
    max: createVector3({ x: 0.5, y: 0.5, z: 1.0 })
  }),
  currentCostPerTime = createLiquidAsset({ dollars: 1e-4 }),
  supportedInputTopologies = [BasicShape.Spool],
  supportedOutputTopologies = [BasicShape.RoughCube, BasicShape.RoughCylinder],
  supportedMaterials = [MaterialType.SimplePolymer],
  outputVolume = createCuboid()
} = {}): FFFPrinter {
  return {
    type: ServiceType.FFFPrinter,
    id,
    location,
    orientation,
    bounds,
    currentCostPerTime,
    supportedInputTopologies,
    supportedOutputTopologies,
    supportedMaterials,
    outputVolume
  };
}

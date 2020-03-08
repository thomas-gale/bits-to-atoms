import { Identity } from '../../../common/identity/types';
import { Vector3, Quaternion, Cuboid } from '../../../common/primitive/types';
import { ServiceType } from '../types';
import { HumanWorker } from './types';
import { createNewIdentity } from '../../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/primitive/factories';
import { MaterialType } from '../../assets/material/types';
import { createLiquidAsset } from '../../../economic/factories';

export function createHumanWorker(
  id: Identity = createNewIdentity('default-humanworker'),
  location: Vector3 = createVector3(),
  orientation: Quaternion = createQuaternion(),
  bounds: Cuboid = createCuboid(
    createVector3(-0.2, -0.2, 0),
    createVector3(0.2, 0.2, 1.5)
  ),
  currentCostPerTime = createLiquidAsset(1e-4),
  capactityMass = 5,
  movementVelocity = 0.5,
  supportedMaterials: MaterialType[] = [MaterialType.SimplePolymer],
  outputVolume: Cuboid = createCuboid()
): HumanWorker {
  return {
    type: ServiceType.HumanWorker,
    id,
    location,
    orientation,
    bounds,
    currentCostPerTime,
    capactityMass,
    movementVelocity,
    supportedMaterials,
    outputVolume
  };
}

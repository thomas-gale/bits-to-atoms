import { Identity, Vector3, Quaternion, Cuboid } from '../../../common/types';
import { ServiceType } from '../types';
import { HumanWorker } from './types';
import {
  createNewIdentity,
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/factories';
import { MaterialType } from '../../material/types';

export function createHumanworker(
  id: Identity = createNewIdentity('default-humanworker'),
  location: Vector3 = createVector3(),
  orientation: Quaternion = createQuaternion(),
  bounds: Cuboid = createCuboid(),
  costDollarPerSecond = 1e-4,
  capactityKg = 5,
  movementSpeedmps = 0.5,
  supportedMaterials: MaterialType[] = [MaterialType.SimplePolymer],
  outputVolumem3: Cuboid = createCuboid()
): HumanWorker {
  return {
    type: ServiceType.HumanWorker,
    id,
    location,
    orientation,
    bounds,
    costDollarPerSecond: costDollarPerSecond,
    capactityKg: capactityKg,
    movementSpeedmps: movementSpeedmps,
    supportedMaterials,
    outputVolumem3: outputVolumem3
  };
}

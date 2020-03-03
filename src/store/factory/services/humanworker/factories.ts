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
  costPerTime = 1e-4,
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
    costPerTime,
    capactityMass,
    movementVelocity,
    supportedMaterials,
    outputVolume
  };
}

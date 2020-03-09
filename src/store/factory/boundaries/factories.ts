import { Identity } from '../../common/identity/types';
import { InputRegion, OutputRegion } from './types';
import { Vector3, Quaternion, Cuboid } from '../../common/primitive/types';
import { FixedAsset } from '../../economic/types';

import { createNewIdentity } from '../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../common/primitive/factories';
import { createEntity } from '../entity/factories';

export function createInputRegion({
  assetsIn = [] as FixedAsset[],
  entity = createEntity({
    id: createNewIdentity({ displayName: 'default-input-region' }),
    bounds: createCuboid({
      min: createVector3({ x: -1, y: -0.5, z: 0 }),
      max: createVector3({ x: 1, y: 0.5, z: 0.1 })
    })
  })
} = {}): InputRegion {
  return {
    id: entity.id,
    location: entity.location,
    orientation: entity.orientation,
    bounds: entity.bounds,
    assetsIn
  };
}

export function createOutputRegion(
  id: Identity = createNewIdentity({ displayName: 'default-output-region' }),
  location: Vector3 = createVector3(),
  orientation: Quaternion = createQuaternion(),
  bounds: Cuboid = createCuboid({
    min: createVector3({ x: -1, y: -0.5, z: 0 }),
    max: createVector3({ x: 1, y: 0.5, z: 0.1 })
  }),
  assetsOut: FixedAsset[] = []
): OutputRegion {
  return {
    id,
    location,
    orientation,
    bounds,
    assetsOut
  };
}

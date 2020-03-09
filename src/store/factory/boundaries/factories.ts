import { Identity } from '../../common/identity/types';
import { Entity } from '../../factory/entity/types';
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

export function createInputRegion(
  assetsIn: FixedAsset[] = [],
  entity: Entity = createEntity(
    createNewIdentity({ displayName: 'default-input-region' }),
    createVector3(),
    createQuaternion(),
    createCuboid(
      createVector3({ x: -1, y: -0.5, z: 0 }),
      createVector3({ x: 1, y: 0.5, z: 0.1 })
    )
  )
): InputRegion {
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
  bounds: Cuboid = createCuboid(
    createVector3({ x: -1, y: -0.5, z: 0 }),
    createVector3({ x: 1, y: 0.5, z: 0.1 })
  ),
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

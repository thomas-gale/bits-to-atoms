import { InputRegion, OutputRegion } from './types';
import { FixedAsset } from '../../economic/types';

import { createNewIdentity } from '../../common/identity/factories';
import { createVector3, createCuboid } from '../../common/primitive/factories';
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
    assetsIn,
    id: entity.id,
    location: entity.location,
    orientation: entity.orientation,
    bounds: entity.bounds
  };
}

export function createOutputRegion({
  assetsOut = [] as FixedAsset[],
  entity = createEntity({
    id: createNewIdentity({ displayName: 'default-output-region' }),
    bounds: createCuboid({
      min: createVector3({ x: -1, y: -0.5, z: 0 }),
      max: createVector3({ x: 1, y: 0.5, z: 0.1 })
    })
  })
} = {}): OutputRegion {
  return {
    assetsOut,
    id: entity.id,
    location: entity.location,
    orientation: entity.orientation,
    bounds: entity.bounds
  };
}

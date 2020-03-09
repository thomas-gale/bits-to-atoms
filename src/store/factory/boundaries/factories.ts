import { InputRegion, OutputRegion } from './types';
import { FixedAsset } from '../../economic/types';
import { createNewIdentity } from '../../common/identity/factories';
import {
  createVector3,
  createCuboid,
  createQuaternion
} from '../../common/primitive/factories';

export function createInputRegion({
  id = createNewIdentity({ displayName: 'default-input-region' }),
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid({
    min: createVector3({ x: -1, y: -0.5, z: 0 }),
    max: createVector3({ x: 1, y: 0.5, z: 0.1 })
  }),
  assetsIn = [] as FixedAsset[]
} = {}): InputRegion {
  return {
    id,
    location,
    orientation,
    bounds,
    assetsIn
  };
}

export function createOutputRegion({
  id = createNewIdentity({ displayName: 'default-output-region' }),
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid({
    min: createVector3({ x: -1, y: -0.5, z: 0 }),
    max: createVector3({ x: 1, y: 0.5, z: 0.1 })
  }),
  assetsOut = [] as FixedAsset[]
} = {}): OutputRegion {
  return {
    assetsOut,
    id,
    location,
    orientation,
    bounds
  };
}

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

export function createInputRegion(
  id: Identity = createNewIdentity('default-input-region'),
  location: Vector3 = createVector3(),
  orientation: Quaternion = createQuaternion(),
  bounds: Cuboid = createCuboid(
    createVector3(-0.5, -0.5, 0),
    createVector3(0.5, 0.5, 0.1)
  ),
  assetsIn: FixedAsset[] = []
): InputRegion {
  return {
    id,
    location,
    orientation,
    bounds,
    assetsIn
  };
}

export function createOutputRegion(
  id: Identity = createNewIdentity('default-output-region'),
  location: Vector3 = createVector3(),
  orientation: Quaternion = createQuaternion(),
  bounds: Cuboid = createCuboid(
    createVector3(-0.5, -0.5, 0),
    createVector3(0.5, 0.5, 0.1)
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

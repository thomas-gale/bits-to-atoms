import { Identity } from '../../../common/identity/types';
import { SimplePolymerSpool } from './types';
import { Vector3, Quaternion, Cuboid } from '../../../common/primitive/types';

import { createNewIdentity } from '../../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/primitive/factories';
import { Material } from '../../../material/types';
import { createSimplePolymerMaterial } from '../../../material/factories';
import { NumberParameter } from '../../../common/parameter/types';
import { createNumberParameter } from '../../../common/parameter/factories';
import { FixedAssetType } from '../../../economic/types';

export function createSimplePolymerSpool(
  id: Identity = createNewIdentity({
    displayName: 'default-simple-polymer-spool'
  }),
  location: Vector3 = createVector3(),
  orientation: Quaternion = createQuaternion(),
  bounds: Cuboid = createCuboid(),
  material: Material = createSimplePolymerMaterial(),
  spoolLength: NumberParameter = createNumberParameter(
    createNewIdentity({ displayName: 'Spool Length' }),
    'm',
    10
  ),
  spoolDiameter: NumberParameter = createNumberParameter(
    createNewIdentity({ displayName: 'Spool Diameter' }),
    'mm',
    1
  ),
  depreciationRate = 0,
  dollars = 10
): SimplePolymerSpool {
  return {
    type: FixedAssetType.SimplePolymerSpool,
    id,
    location,
    orientation,
    bounds,
    material,
    spoolLength,
    spoolDiameter,
    depreciationRate,
    dollars
  };
}

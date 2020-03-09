import { SimplePolymerSpool } from './types';

import { createNewIdentity } from '../../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/primitive/factories';
import { createSimplePolymerMaterial } from '../../../material/factories';
import { createNumberParameter } from '../../../common/parameter/factories';
import { FixedAssetType } from '../../../economic/types';

export function createSimplePolymerSpool({
  id = createNewIdentity({
    displayName: 'default-simple-polymer-spool'
  }),
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid(),
  material = createSimplePolymerMaterial(),
  spoolLength = createNumberParameter({
    identity: createNewIdentity({ displayName: 'Spool Length' }),
    units: 'm',
    value: 10
  }),
  spoolDiameter = createNumberParameter({
    identity: createNewIdentity({ displayName: 'Spool Diameter' }),
    units: 'mm',
    value: 1
  }),
  depreciationRate = 0,
  dollars = 10
}): SimplePolymerSpool {
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

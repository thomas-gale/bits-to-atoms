import { createUuid } from '../../../common/identity/factories';
import { createNumberParameter } from '../../../common/parameter/factories';
import {
  createCuboid,
  createQuaternion,
  createVector3
} from '../../../common/primitive/factories';
import { FixedAssetType } from '../../../economic/types';
import { createSimplePolymerMaterial } from '../../../material/factories';
import { SimplePolymerSpool } from './types';

export function createSimplePolymerSpool({
  id = createUuid(),
  displayName = 'default-simple-polymer-spool',
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid(),
  material = createSimplePolymerMaterial(),
  spoolLength = createNumberParameter({
    displayName: 'Spool Length',
    units: 'm',
    value: 10
  }),
  spoolDiameter = createNumberParameter({
    displayName: 'Spool Diameter',
    units: 'mm',
    value: 1
  }),
  depreciationRate = 0,
  dollars = 10
} = {}): SimplePolymerSpool {
  return {
    id,
    displayName,
    type: FixedAssetType.SimplePolymerSpool,
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

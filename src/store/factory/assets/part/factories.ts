import { createUuid } from '../../../common/identity/factories';
import {
  createCuboid,
  createQuaternion,
  createVector3
} from '../../../common/primitive/factories';
import { FixedAssetType } from '../../../economic/types';
import { OutputComponent } from './types';

export function createOutputComponent({
  id = createUuid(),
  displayName = 'default-output-component',
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid(),
  buildRequestUuid = '',
  depreciationRate = 0,
  dollars = 50
} = {}): OutputComponent {
  return {
    type: FixedAssetType.OutputComponent,
    id,
    displayName,
    location,
    orientation,
    bounds,
    buildRequestUuid,
    depreciationRate,
    dollars
  };
}

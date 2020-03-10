import { OutputComponent } from './types';
import { createNewIdentity } from '../../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/primitive/factories';
import { FixedAssetType } from '../../../economic/types';

export function createOutputComponent({
  id = createNewIdentity({ displayName: 'default-output-component' }),
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
    location,
    orientation,
    bounds,
    buildRequestUuid,
    depreciationRate,
    dollars
  };
}

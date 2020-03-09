import { OutputComponent } from './types';
import { createNewIdentity } from '../../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/primitive/factories';
import { FixedAssetType } from '../../../economic/types';
import { createBuildRequest } from '../../../market/factories';

export function createOutputComponent({
  id = createNewIdentity({ displayName: 'default-output-component' }),
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid(),
  buildRequest = createBuildRequest(),
  depreciationRate = 0,
  dollars = 50
} = {}): OutputComponent {
  return {
    type: FixedAssetType.OutputComponent,
    id,
    location,
    orientation,
    bounds,
    buildRequest,
    depreciationRate,
    dollars
  };
}

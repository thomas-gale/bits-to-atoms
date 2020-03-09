import { Identity } from '../../../common/identity/types';
import { OutputComponent } from './types';
import { Vector3, Quaternion, Cuboid } from '../../../common/primitive/types';

import { createNewIdentity } from '../../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../../common/primitive/factories';
import { Material } from '../../../material/types';
import { createSimplePolymerMaterial } from '../../../material/factories';
import { FixedAssetType } from '../../../economic/types';
import { BuildRequest } from '../../../market/types';
import { createBuildRequest } from '../../../market/factories';

export function createOutputComponent(
  id: Identity = createNewIdentity('default-output-component'),
  location: Vector3 = createVector3(),
  orientation: Quaternion = createQuaternion(),
  bounds: Cuboid = createCuboid(),
  buildRequest: BuildRequest = createBuildRequest(),
  depreciationRate = 0,
  dollars = 50
): OutputComponent {
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

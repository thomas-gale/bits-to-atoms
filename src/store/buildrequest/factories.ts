import { createUuid } from '../common/identity/factories';
import { BasicShape } from '../common/topology/types';
import { createLiquidAsset } from '../economic/factories';
import { createSimplePolymerMaterial } from '../material/factories';
import { BuildRequest } from './types';

export function createBuildRequest({
  id = createUuid(),
  displayName = 'default-build-request',
  created = new Date(),
  material = createSimplePolymerMaterial(),
  endShape = BasicShape.Cube,
  scale = 1e-2,
  fixedValue = createLiquidAsset({ dollars: 20 }),
  workflow = undefined
} = {}): BuildRequest {
  return {
    id,
    displayName,
    created,
    material,
    endShape,
    scale,
    fixedValue,
    workflow
  };
}

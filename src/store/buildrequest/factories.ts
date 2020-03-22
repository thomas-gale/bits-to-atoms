import { BasicShape } from '../common/topology/types';
import { BuildRequest } from './types';
import { Workflow } from '../workflow/types';
import { createUuid } from '../common/identity/factories';
import { createLiquidAsset } from '../economic/factories';
import { createSimplePolymerMaterial } from '../material/factories';

export function createBuildRequest({
  id = createUuid(),
  displayName = 'default-build-request',
  created = new Date(),
  material = createSimplePolymerMaterial(),
  endShape = BasicShape.Cube,
  scale = 1e-2,
  fixedValue = createLiquidAsset({ dollars: 20 }),
  workflow = undefined as Workflow | undefined
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

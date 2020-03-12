import { BasicShape } from '../common/topology/types';
import { BuildRequest } from './types';
import { createNewIdentity } from '../common/identity/factories';
import { createSimplePolymerMaterial } from '../material/factories';
import { createLiquidAsset } from '../economic/factories';

export function createBuildRequest({
  identity = createNewIdentity({
    displayName: 'default-build-request'
  }),
  created = new Date(),
  material = createSimplePolymerMaterial(),
  endShape = BasicShape.Cube,
  scale = 1e-2,
  fixedValue = createLiquidAsset({ dollars: 20 })
} = {}): BuildRequest {
  return {
    identity,
    created,
    material,
    endShape,
    scale,
    fixedValue
  };
}

import { createNewIdentity } from '../common/identity/factories';
import { createSimplePolymerMaterial } from '../material/factories';
import { PartType, BuildRequest } from './types';
import { createLiquidAsset } from '../economic/factories';

export function createBuildRequest({
  identity = createNewIdentity({
    displayName: 'default-build-request'
  }),
  material = createSimplePolymerMaterial(),
  type = PartType.Cube,
  size = 10,
  fixedValue = createLiquidAsset({ dollars: 20 })
} = {}): BuildRequest {
  return {
    identity,
    material,
    type,
    size,
    fixedValue
  };
}

import { PartType, BuildRequest } from './types';
import { createNewIdentity } from '../common/identity/factories';
import { createSimplePolymerMaterial } from '../material/factories';
import { createLiquidAsset } from '../economic/factories';

export function createBuildRequest({
  identity = createNewIdentity({
    displayName: 'default-build-request'
  }),
  created = new Date(),
  material = createSimplePolymerMaterial(),
  type = PartType.Cube,
  size = 10,
  fixedValue = createLiquidAsset({ dollars: 20 })
} = {}): BuildRequest {
  return {
    identity,
    created,
    material,
    type,
    size,
    fixedValue
  };
}

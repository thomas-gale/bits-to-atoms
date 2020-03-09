import { createNewIdentity } from '../common/identity/factories';
import { createSimplePolymerMaterial } from '../material/factories';
import { PartType, BuildRequest } from './types';
import { createLiquidAsset } from '../economic/factories';

export function createBuildRequest({
  Identity: identity = createNewIdentity({
    displayName: 'default-build-request'
  }),
  Material: material = createSimplePolymerMaterial(),
  PartType: type = PartType.Cube,
  number: size = 10,
  LiquidAsset: fixedValue = createLiquidAsset({ dollars: 20 })
} = {}): BuildRequest {
  return {
    identity,
    material,
    type,
    size,
    fixedValue
  };
}

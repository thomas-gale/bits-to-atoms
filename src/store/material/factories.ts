import { createNewIdentity } from '../common/identity/factories';
import { MaterialType, Material } from './types';
import { createLiquidAsset } from '../economic/factories';

export function createSimplePolymerMaterial({
  id = createNewIdentity({ displayName: 'default-simple-polymer' }),
  costPerMass = createLiquidAsset({ dollars: 10 })
} = {}): Material {
  return {
    id,
    type: MaterialType.SimplePolymer,
    costPerMass
  };
}

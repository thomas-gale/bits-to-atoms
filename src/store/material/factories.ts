import { Identity } from '../common/identity/types';
import { createNewIdentity } from '../common/identity/factories';
import { MaterialType, Material } from './types';
import { LiquidAsset } from '../economic/types';
import { createLiquidAsset } from '../economic/factories';

export function createSimplePolymerMaterial(
  id: Identity = createNewIdentity('default-simple-polymer'),
  costPerMass: LiquidAsset = createLiquidAsset(10)
): Material {
  return {
    id,
    type: MaterialType.SimplePolymer,
    costPerMass
  };
}

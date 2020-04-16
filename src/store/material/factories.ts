import { MaterialType, Material } from './types';
import { createLiquidAsset } from '../economic/factories';

export function createSimplePolymerMaterial({
  costPerMass = createLiquidAsset({ value: { dollars: 10 } }),
} = {}): Material {
  return {
    type: MaterialType.SimplePolymer,
    costPerMass,
  };
}

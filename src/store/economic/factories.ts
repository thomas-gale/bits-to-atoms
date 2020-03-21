import { FixedAssetType, LiquidAsset, FixedAsset } from './types';
import { createEntity } from '../factory/entity/factories';
import { createNewIdentity } from '../common/identity/factories';

export const dollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export function createLiquidAsset({
  id = createNewIdentity({ displayName: 'default-liquid-asset' }),
  dollars = 500
} = {}): LiquidAsset {
  return {
    id,
    dollars
  };
}

export function createFixedAsset({
  type = FixedAssetType.Undefined,
  depreciationRate = 0,
  dollars = 10,
  entity = createEntity()
} = {}): FixedAsset {
  return {
    type,
    depreciationRate,
    dollars,
    id: entity.id,
    location: entity.location,
    orientation: entity.orientation,
    bounds: entity.bounds
  };
}

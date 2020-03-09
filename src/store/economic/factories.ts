import { FixedAssetType, LiquidAsset, FixedAsset } from './types';
import { createEntity } from '../factory/entity/factories';

export function createLiquidAsset({ dollars = 500 } = {}): LiquidAsset {
  return {
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

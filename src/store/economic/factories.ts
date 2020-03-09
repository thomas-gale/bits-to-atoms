import { FixedAssetType, LiquidAsset, FixedAsset } from './types';
import { Entity } from '../factory/entity/types';
import { createEntity } from '../factory/entity/factories';

export function createLiquidAsset({ dollars = 500 } = {}): LiquidAsset {
  return {
    dollars
  };
}

export function createFixedAsset(
  type: FixedAssetType,
  currentValueDollars = 100,
  depreciationRate = 0,
  dollars = 10,
  entity: Entity = createEntity()
): FixedAsset {
  return {
    type,
    currentValueDollars,
    depreciationRate,
    dollars,
    id: entity.id,
    location: entity.location,
    orientation: entity.orientation,
    bounds: entity.bounds
  };
}

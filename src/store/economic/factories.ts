import { createUuid } from '../common/identity/factories';
import {
  createCuboid,
  createQuaternion,
  createVector3
} from '../common/primitive/factories';
import { FixedAsset, FixedAssetType, LiquidAsset } from './types';

export const dollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export function createLiquidAsset({
  id = createUuid(),
  displayName = 'default-liquid-asset',
  dollars = 500
} = {}): LiquidAsset {
  return {
    id,
    displayName,
    dollars
  };
}

export function createFixedAsset({
  id = createUuid(),
  displayName = 'default-fixed-asset',
  type = FixedAssetType.Undefined,
  depreciationRate = 0,
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid()
} = {}): FixedAsset {
  return {
    id,
    displayName,
    type,
    depreciationRate,
    location,
    orientation,
    bounds
  };
}

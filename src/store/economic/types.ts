import { Entity } from '../factory/entity/types';
import { Identity } from '../common/identity/types';

export interface EconomicValue {
  dollars: number;
}

interface BaseAsset extends Identity {
  value: EconomicValue;
}

export type LiquidAsset = BaseAsset;

export enum FixedAssetType {
  Product = 'Product',
}

export interface FixedAsset<T = never>
  extends BaseAsset,
    Entity<T | number | EconomicValue> {
  type: FixedAssetType;
  depreciationRate: number;
}

export type Asset = LiquidAsset | FixedAsset;

export interface EconomicSummary {
  currentAssetsValue: LiquidAsset;
  totalOut: LiquidAsset;
  totalIn: LiquidAsset;
}

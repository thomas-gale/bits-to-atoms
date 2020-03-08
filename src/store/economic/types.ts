import { Entity } from '../factory/entity/types';

export interface LiquidAsset {
  dollars: number;
}

export interface FixedAsset<T = never> extends LiquidAsset, Entity<number | T> {
  depreciationRate: number;
}

export type Asset = LiquidAsset | FixedAsset;

export interface EconomicSummary {
  currentAssetsValue: LiquidAsset;
  totalOut: LiquidAsset;
  totalIn: LiquidAsset;
}

import { Entity } from '../factory/entity/types';

export interface LiquidAsset {
  dollars: number;
}

export enum FixedAssetType {
  SimplePolymerSpool,
  OutputComponent
}

export interface FixedAsset<T = never> extends LiquidAsset, Entity<number | T> {
  type: FixedAssetType;
  depreciationRate: number;
}

export type Asset = LiquidAsset | FixedAsset;

export interface EconomicSummary {
  currentAssetsValue: LiquidAsset;
  totalOut: LiquidAsset;
  totalIn: LiquidAsset;
}

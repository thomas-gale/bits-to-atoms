import { Entity } from '../factory/entity/types';
import { Identity } from '../common/identity/types';

type BaseAsset = Identity;

export interface LiquidAsset extends BaseAsset {
  dollars: number;
}

export enum FixedAssetType {
  Undefined,
  SimplePolymerSpool,
  OutputComponent,
}

export interface FixedAsset<T = never> extends BaseAsset, Entity<T | number> {
  type: FixedAssetType;
  depreciationRate: number;
}

export type Asset = LiquidAsset | FixedAsset;

export interface EconomicSummary {
  currentAssetsValue: LiquidAsset;
  totalOut: LiquidAsset;
  totalIn: LiquidAsset;
}

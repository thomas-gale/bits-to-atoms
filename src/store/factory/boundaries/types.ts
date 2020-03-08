import { Entity } from '../entity/types';
import { FixedAsset } from '../../economic/types';

export interface InputRegion<T = never> extends Entity<FixedAsset[] | T> {
  assetsIn: FixedAsset[];
}

export interface OutputRegion<T = never> extends Entity<FixedAsset[] | T> {
  assetsOut: FixedAsset[];
}

export type Boundary = InputRegion | OutputRegion;

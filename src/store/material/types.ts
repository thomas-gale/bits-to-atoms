import { LiquidAsset } from '../economic/types';

export enum MaterialType {
  SimplePolymer = 'SimplePolymer'
}

export interface Material {
  type: MaterialType;
  costPerMass: LiquidAsset;
}

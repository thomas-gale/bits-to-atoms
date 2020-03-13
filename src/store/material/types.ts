import { Identity } from '../common/identity/types';
import { LiquidAsset } from '../economic/types';

export enum MaterialType {
  SimplePolymer = "SimplePolymer"
}

export interface Material {
  id: Identity;
  type: MaterialType;
  costPerMass: LiquidAsset;
}

import { Identity } from '../common/identity/types';
import { Material } from '../factory/assets/material/types';
import { LiquidAsset } from '../economic/types';

export enum PartType {
  CUBE
}

export interface BuildRequest {
  identity: Identity;
  material: Material;
  type: PartType;
  size: number;
  fixedValue: LiquidAsset;
}

export interface Market {
  visible: boolean;
  buildRequests: BuildRequest[];
}

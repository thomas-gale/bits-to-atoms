import { Identity } from '../common/identity/types';
import { Material } from '../material/types';
import { LiquidAsset } from '../economic/types';

export enum PartType {
  Cube
}

export interface BuildRequest {
  identity: Identity;
  created: Date;
  material: Material;
  type: PartType;
  size: number;
  fixedValue: LiquidAsset;
}

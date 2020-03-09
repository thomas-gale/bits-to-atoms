import { Identity } from '../common/identity/types';
import { LiquidAsset } from '../economic/types';
import { Material } from '../material/types';

export enum PartType {
  Cube
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

import { Identity } from '../common/identity/types';
import { Material } from '../material/types';
import { LiquidAsset } from '../economic/types';
import { BasicShape } from '../common/topology/types';

export interface BuildRequest {
  identity: Identity;
  created: Date;
  material: Material;
  endShape: BasicShape;
  scale: number;
  fixedValue: LiquidAsset;
}

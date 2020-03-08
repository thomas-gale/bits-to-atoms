import { NumberParameter } from '../../../common/parameter/types';
import { FixedAsset } from '../../../economic/types';
import { Material } from '../../../material/types';

export interface SimplePolymerSpool
  extends FixedAsset<Material | NumberParameter> {
  material: Material;
  spoolLength: NumberParameter;
  spoolDiameter: NumberParameter;
}

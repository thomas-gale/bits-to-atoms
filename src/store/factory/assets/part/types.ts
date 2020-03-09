import { NumberParameter } from '../../../common/parameter/types';
import { FixedAsset } from '../../../economic/types';
import { Material } from '../../../material/types';
import { BuildRequest } from '../../../market/types';

export interface OutputComponent
  extends FixedAsset<BuildRequest> {
    buildRequest: BuildRequest;
}

import { FixedAsset } from '../../../economic/types';
import { BuildRequest } from '../../../market/types';

export interface OutputComponent extends FixedAsset<BuildRequest> {
  buildRequest: BuildRequest;
}

import { FixedAsset } from '../../../economic/types';

export interface OutputComponent extends FixedAsset<string> {
  buildRequestUuid: string;
}

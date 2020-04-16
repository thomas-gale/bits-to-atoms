import { FixedAsset, FixedAssetType } from '../../economic/types';

export interface Product extends FixedAsset {
  type: FixedAssetType.Product;
}

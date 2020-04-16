import { createUuid } from '../../common/identity/factories';
import {
  createCuboid,
  createQuaternion,
  createVector3,
} from '../../common/primitive/factories';
import { FixedAssetType } from '../../economic/types';
import { Product } from './types';

export function createProduct({
  id = createUuid(),
  displayName = 'default-product',
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid(),
  buildRequestUuid = '',
  depreciationRate = 0,
  value = { dollars: 50 },
} = {}): Product {
  return {
    type: FixedAssetType.Product,
    id,
    displayName,
    location,
    orientation,
    bounds,
    buildRequestUuid,
    depreciationRate,
    value,
  };
}

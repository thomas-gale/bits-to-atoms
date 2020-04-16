import { createUuid } from '../common/identity/factories';
import { LiquidAsset } from './types';

export const dollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function createLiquidAsset({
  id = createUuid(),
  displayName = 'default-liquid-asset',
  value = { dollars: 500 },
} = {}): LiquidAsset {
  return {
    id,
    displayName,
    value,
  };
}

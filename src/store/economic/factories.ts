export function createLiquidAsset(dollars = 500) {
  return {
    dollars
  };
}

export function createFixedAsset(currentValueDollars = 100) {
  return {
    currentValueDollars
  };
}

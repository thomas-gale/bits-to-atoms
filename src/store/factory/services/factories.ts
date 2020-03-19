import { BasicShape } from '../../common/topology/types';
import {
  BasicShapeTransmutationState,
  TransmutationStateType,
  LiquidAssetTransmutationState,
  TransmutationState
} from '../../workflow/types';
import { TransmutationTransition } from './types';
import { createLiquidAsset } from '../../economic/factories';

export function createBasicShapeTransmutationState({
  shape = BasicShape.Cube
} = {}): BasicShapeTransmutationState {
  return {
    type: TransmutationStateType.BasicShape,
    shape
  };
}

export function createLiquidAssetTransmutationState({
  liquidAsset = createLiquidAsset()
} = {}): LiquidAssetTransmutationState {
  return {
    type: TransmutationStateType.LiquidAsset,
    liquidAsset
  };
}

export function createTransmutationTransition({
  start = createBasicShapeTransmutationState() as TransmutationState,
  end = createBasicShapeTransmutationState() as TransmutationState
} = {}): TransmutationTransition {
  return {
    start,
    end
  };
}

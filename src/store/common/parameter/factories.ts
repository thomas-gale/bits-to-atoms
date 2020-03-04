import { Identity } from '../identity/types';
import { NumberParameter, ParameterType, StringParameter } from './types';
import { createNewIdentity } from '../identity/factories';

export function createNumberParameter(
  identity: Identity = createNewIdentity('default-number-parameter'),
  units = '',
  value = 0
): NumberParameter {
  return {
    identity,
    type: ParameterType.Number,
    units,
    value
  };
}

export function createStringParameter(
  identity: Identity = createNewIdentity('default-number-parameter'),
  units = '',
  value = ''
): StringParameter {
  return {
    identity,
    type: ParameterType.String,
    units,
    value
  };
}

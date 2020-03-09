import { NumberParameter, ParameterType, StringParameter } from './types';
import { createNewIdentity } from '../identity/factories';

export function createNumberParameter({
  identity = createNewIdentity({
    displayName: 'default-number-parameter'
  }),
  units = '',
  value = 0
} = {}): NumberParameter {
  return {
    identity,
    type: ParameterType.Number,
    units,
    value
  };
}

export function createStringParameter({
  identity = createNewIdentity({
    displayName: 'default-string-parameter'
  }),
  units = '',
  value = ''
} = {}): StringParameter {
  return {
    identity,
    type: ParameterType.String,
    units,
    value
  };
}

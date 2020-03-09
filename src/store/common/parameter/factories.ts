import { Identity } from '../identity/types';
import { NumberParameter, ParameterType, StringParameter } from './types';
import { createNewIdentity } from '../identity/factories';

export function createNumberParameter({
  identity = createNewIdentity({
    displayName: 'default-number-parameter'
  }),
  units = '',
  value = 0
}: {
  identity: Identity;
  units: string;
  value: number;
}): NumberParameter {
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
}: {
  identity: Identity;
  units: string;
  value: string;
}): StringParameter {
  return {
    identity,
    type: ParameterType.String,
    units,
    value
  };
}

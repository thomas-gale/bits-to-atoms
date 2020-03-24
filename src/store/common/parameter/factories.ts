import { NumberParameter, ParameterType, StringParameter } from './types';
import { createUuid } from '../identity/factories';

export function createNumberParameter({
  id = createUuid(),
  displayName = 'default-number-parameter',
  units = '',
  value = 0,
} = {}): NumberParameter {
  return {
    type: ParameterType.Number,
    id,
    displayName,
    units,
    value,
  };
}

export function createStringParameter({
  id = createUuid(),
  displayName = 'default-string-parameter',
  units = '',
  value = '',
} = {}): StringParameter {
  return {
    type: ParameterType.String,
    id,
    displayName,
    units,
    value,
  };
}

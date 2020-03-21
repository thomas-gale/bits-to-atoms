import { v4 as uuidv4 } from 'uuid';
import { Identity } from './types';

export function createUuid() {
  return uuidv4();
}

export function createExistingIdentity({
  displayName = '',
  id = ''
} = {}): Identity {
  return {
    id,
    displayName
  };
}

export function createNewIdentity({ displayName = 'default' } = {}): Identity {
  return {
    id: createUuid(),
    displayName: displayName
  };
}

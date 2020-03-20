import { v4 as uuidv4 } from 'uuid';
import { Identity } from './types';

export function createExistingIdentity({
  displayName = '',
  uuid = ''
} = {}): Identity {
  return {
    id: uuid,
    displayName
  };
}

export function createNewIdentity({ displayName = 'default' } = {}): Identity {
  return {
    id: uuidv4(),
    displayName: displayName
  };
}

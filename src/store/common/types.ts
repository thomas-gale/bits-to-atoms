import { v4 as uuidv4 } from 'uuid';

export interface Identity {
  uuid: string;
  displayName: string;
}

export function createExistingIdentity(
  displayName: string,
  uuid: string
): Identity {
  return {
    uuid,
    displayName
  };
}

export function createNewIdentity(displayName: string): Identity {
  return {
    uuid: uuidv4(),
    displayName: displayName
  };
}

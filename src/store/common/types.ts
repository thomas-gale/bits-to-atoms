import { v4 as uuidv4 } from 'uuid';

export interface Identity {
  uuid: string;
  displayName: string;
}

// Generate an display
export function createNewIdentity(displayName: string): Identity {
  return {
    uuid: uuidv4(),
    displayName: displayName
  }
}

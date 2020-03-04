import { Identity } from '../identity/types';
import { SimplePolymer } from './types';
import { createNewIdentity } from '../identity/factories';

export function createSimplePolymer(
  id: Identity = createNewIdentity('default-simple-polymer')
): SimplePolymer {
  return {
    id
  };
}

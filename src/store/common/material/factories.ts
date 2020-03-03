import { Identity } from '../primitive/types';
import { SimplePolymer } from './types';
import { createNewIdentity } from '../primitive/factories';

export function createSimplePolymer(
  id: Identity = createNewIdentity('default-simple-polymer')
): SimplePolymer {
  return {
    id
  };
}

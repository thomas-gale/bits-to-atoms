import { Identity } from '../../../common/identity/types';
import { SimplePolymer } from './types';
import { createNewIdentity } from '../../../common/identity/factories';

export function createSimplePolymer(
  id: Identity = createNewIdentity('default-simple-polymer')
): SimplePolymer {
  return {
    id
  };
}

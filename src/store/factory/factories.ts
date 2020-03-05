import { Identity } from '../common/identity/types';
import { ServiceProvider } from './services/types';
import { Factory } from './types';
import { createNewIdentity } from '../common/identity/factories';
import { createFloorSpace } from './services/floorspace/factories';
import { createHumanWorker } from './services/humanworker/factories';
import { createVector3 } from '../common/primitive/factories';

export function createFactory(
  identity: Identity = createNewIdentity('default-factory'),
  serviceProviders: ServiceProvider[] = [
    createFloorSpace(),
    createHumanWorker(createNewIdentity('Human 1'), createVector3(1, 2, 0))
  ]
): Factory {
  return {
    identity,
    serviceProviders
  };
}

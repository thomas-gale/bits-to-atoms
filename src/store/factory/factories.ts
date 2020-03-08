import { Identity } from '../common/identity/types';
import { Asset } from '../economic/types';
import { ServiceProvider } from './services/types';
import { Factory } from './types';

import { createNewIdentity } from '../common/identity/factories';
import { createFloorSpace } from './services/floorspace/factories';
import { createHumanWorker } from './services/humanworker/factories';
import { createVector3 } from '../common/primitive/factories';
import { createFFFPrinter } from './services/fffprinter/factories';
import { createLiquidAsset } from '../economic/factories';

export function createFactory(
  identity: Identity = createNewIdentity('default-factory'),
  assets: Asset[] = [createLiquidAsset()],
  serviceProviders: ServiceProvider[] = [
    createFloorSpace(createNewIdentity('Floorspace 1')),
    createHumanWorker(createNewIdentity('Human 1'), createVector3(2.5, 1, 0)),
    createFFFPrinter(createNewIdentity('Printer 1'), createVector3(-2.5, 1, 0))
  ]
): Factory {
  return {
    identity,
    assets,
    serviceProviders
  };
}

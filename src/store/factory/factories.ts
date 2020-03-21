import { BuildRequest } from '../buildrequest/types';
import { createUuid } from '../common/identity/factories';
import { createCuboid, createVector3 } from '../common/primitive/factories';
import { createLiquidAsset } from '../economic/factories';
import { FixedAsset } from '../economic/types';
import { createDispatchService } from './services/dispatchservice/factories';
import { createFFFPrinter } from './services/fffprinter/factories';
import { createFloorSpace } from './services/floorspace/factories';
import { createHumanWorker } from './services/humanworker/factories';
import { createProcurementService } from './services/procurementservice/factories';
import { Factory } from './types';

export function createFactory({
  id = createUuid(),
  displayName = 'default-factory',
  liquidAsset = createLiquidAsset(),
  fixedAssets = [] as FixedAsset[],
  buildRequests = [] as BuildRequest[],
  serviceProviders = [
    createFloorSpace({
      displayName: 'Floorspace 1'
    }),
    createProcurementService({
      displayName: 'Procurement 1',
      location: createVector3({ x: -3, y: 2.5 }),
      bounds: createCuboid({
        min: createVector3({ x: -1, y: -0.5 }),
        max: createVector3({ x: 1, y: 0.5, z: 0.1 })
      })
    }),
    createHumanWorker({
      displayName: 'Human 1',
      location: createVector3({ x: 3, y: 1 })
    }),
    createFFFPrinter({
      displayName: 'Printer 1',
      location: createVector3({ x: 0, y: -1 })
    }),
    createDispatchService({
      displayName: 'Dispatch 1',
      location: createVector3({ x: 3, y: 2.5 }),
      bounds: createCuboid({
        min: createVector3({ x: -1, y: -0.5 }),
        max: createVector3({ x: 1, y: 0.5, z: 0.1 })
      })
    })
  ]
} = {}): Factory {
  return {
    id,
    displayName,
    liquidAsset,
    fixedAssets,
    buildRequests,
    serviceProviders
  };
}

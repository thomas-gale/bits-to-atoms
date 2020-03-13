import { FixedAssetType, FixedAsset } from '../economic/types';
import { Factory } from './types';

import { createNewIdentity } from '../common/identity/factories';
import { createFloorSpace } from './services/floorspace/factories';
import { createHumanWorker } from './services/humanworker/factories';
import { createVector3, createCuboid } from '../common/primitive/factories';
import { createFFFPrinter } from './services/fffprinter/factories';
import { createLiquidAsset, createFixedAsset } from '../economic/factories';
import { createInputRegion, createOutputRegion } from './boundaries/factories';
import { createEntity } from './entity/factories';
import { BuildRequest } from '../buildrequest/types';

export function createFactory({
  identity = createNewIdentity({ displayName: 'default-factory' }),
  activeBuildRequests = [] as BuildRequest[],
  inputRegion = createInputRegion({
    id: createNewIdentity({ displayName: 'Input Region' }),
    location: createVector3({ x: -3, y: 2.5 }),
    bounds: createCuboid({
      min: createVector3({ x: -1, y: -0.5 }),
      max: createVector3({ x: 1, y: 0.5, z: 0.1 })
    }),
    assetsIn: [
      createFixedAsset({
        type: FixedAssetType.SimplePolymerSpool,
        depreciationRate: 0,
        dollars: 20,
        entity: createEntity({
          id: createNewIdentity({ displayName: 'Polymer 1' }),
          location: createVector3({ x: -2.5, y: 2.5, z: 0.2 })
        })
      })
    ]
  }),
  outputRegion = createOutputRegion({
    id: createNewIdentity({ displayName: 'Output Region' }),
    location: createVector3({ x: 3, y: 2.5 }),
    bounds: createCuboid({
      min: createVector3({ x: -1, y: -0.5 }),
      max: createVector3({ x: 1, y: 0.5, z: 0.1 })
    })
  }),
  liquidAsset = createLiquidAsset(),
  fixedAssets = [] as FixedAsset[],
  serviceProviders = [
    createFloorSpace({
      id: createNewIdentity({ displayName: 'Floorspace 1' })
    }),
    createHumanWorker({
      id: createNewIdentity({ displayName: 'Human 1' }),
      location: createVector3({ x: 3, y: 1 })
    }),
    createFFFPrinter({
      id: createNewIdentity({ displayName: 'Printer 1' }),
      location: createVector3({ x: 0, y: -1 })
    })
  ]
} = {}): Factory {
  return {
    identity,
    activeBuildRequests,
    inputRegion,
    outputRegion,
    liquidAsset,
    fixedAssets,
    serviceProviders
  };
}

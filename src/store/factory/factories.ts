import { Identity } from '../common/identity/types';
import { InputRegion, OutputRegion } from './boundaries/types';
import { Asset, FixedAssetType } from '../economic/types';
import { ServiceProvider } from './services/types';
import { Factory } from './types';

import { createNewIdentity } from '../common/identity/factories';
import { createFloorSpace } from './services/floorspace/factories';
import { createHumanWorker } from './services/humanworker/factories';
import { createVector3, createCuboid } from '../common/primitive/factories';
import { createFFFPrinter } from './services/fffprinter/factories';
import { createLiquidAsset, createFixedAsset } from '../economic/factories';
import { createInputRegion, createOutputRegion } from './boundaries/factories';
import { createEntity } from './entity/factories';

export function createFactory(
  identity: Identity = createNewIdentity({ displayName: 'default-factory' }),
  inputRegion: InputRegion = createInputRegion({
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
    ],
    entity: createEntity({
      id: createNewIdentity({ displayName: 'Input Region' }),
      location: createVector3({ x: -3, y: 2.5 }),
      bounds: createCuboid({
        min: createVector3({ x: -1, y: -0.5 }),
        max: createVector3({ x: 1, y: 0.5, z: 0.1 })
      })
    })
  }),
  outputRegion: OutputRegion = createOutputRegion({
    entity: createEntity({
      id: createNewIdentity({ displayName: 'Output Region' }),
      location: createVector3({ x: 3, y: 2.5 }),
      bounds: createCuboid({
        min: createVector3({ x: -1, y: -0.5 }),
        max: createVector3({ x: 1, y: 0.5, z: 0.1 })
      })
    })
  }),
  assets: Asset[] = [createLiquidAsset()],
  serviceProviders: ServiceProvider[] = [
    createFloorSpace(createNewIdentity({ displayName: 'Floorspace 1' })),
    createHumanWorker(
      createNewIdentity({ displayName: 'Human 1' }),
      createVector3({ x: 3, y: 1 })
    ),
    createFFFPrinter({
      id: createNewIdentity({ displayName: 'Printer 1' }),
      location: createVector3({ x: 0, y: -1 })
    })
  ]
): Factory {
  return {
    identity,
    inputRegion,
    outputRegion,
    assets,
    serviceProviders
  };
}

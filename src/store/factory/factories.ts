import { Identity } from '../common/identity/types';
import { InputRegion, OutputRegion } from './boundaries/types';
import { Asset, FixedAssetType } from '../economic/types';
import { ServiceProvider } from './services/types';
import { Factory } from './types';

import { createNewIdentity } from '../common/identity/factories';
import { createFloorSpace } from './services/floorspace/factories';
import { createHumanWorker } from './services/humanworker/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../common/primitive/factories';
import { createFFFPrinter } from './services/fffprinter/factories';
import { createLiquidAsset, createFixedAsset } from '../economic/factories';
import { createInputRegion, createOutputRegion } from './boundaries/factories';
import { createEntity } from './entity/factories';

export function createFactory(
  identity: Identity = createNewIdentity({ displayName: 'default-factory' }),
  inputRegion: InputRegion = createInputRegion(
    [
      createFixedAsset(
        FixedAssetType.SimplePolymerSpool,
        10,
        0,
        20,
        createEntity(
          createNewIdentity({ displayName: 'Polymer 1' }),
          createVector3({ x: -2.5, y: 2.5, z: 0.2 }),
          createQuaternion(),
          createCuboid()
        )
      )
    ],
    createEntity(
      createNewIdentity({ displayName: 'Input Region' }),
      createVector3({ x: -3, y: 2.5 }),
      createQuaternion(),
      createCuboid(
        createVector3({ x: -1, y: -0.5 }),
        createVector3({ x: 1, y: 0.5, z: 0.1 })
      )
    )
  ),
  outputRegion: OutputRegion = createOutputRegion(
    createNewIdentity({ displayName: 'Output Region' }),
    createVector3({ x: 3, y: 2.5 })
  ),
  assets: Asset[] = [createLiquidAsset()],
  serviceProviders: ServiceProvider[] = [
    createFloorSpace(createNewIdentity({ displayName: 'Floorspace 1' })),
    createHumanWorker(
      createNewIdentity({ displayName: 'Human 1' }),
      createVector3({ x: 3, y: 1 })
    ),
    createFFFPrinter(
      createNewIdentity({ displayName: 'Printer 1' }),
      createVector3({ x: 0, y: -1 })
    )
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

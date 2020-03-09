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
  identity: Identity = createNewIdentity('default-factory'),
  inputRegion: InputRegion = createInputRegion(
    [
      createFixedAsset(
        FixedAssetType.SimplePolymerSpool,
        10,
        0,
        20,
        createEntity(
          createNewIdentity('Polymer 1'),
          createVector3(-2.5, 2.5, 0.2),
          createQuaternion(),
          createCuboid()
        )
      )
    ],
    createEntity(
      createNewIdentity('Input Region'),
      createVector3(-3, 2.5, 0),
      createQuaternion(),
      createCuboid(createVector3(-1, -0.5, 0), createVector3(1, 0.5, 0.1))
    )
  ),
  outputRegion: OutputRegion = createOutputRegion(
    createNewIdentity('Output Region'),
    createVector3(3, 2.5, 0)
  ),
  assets: Asset[] = [createLiquidAsset()],
  serviceProviders: ServiceProvider[] = [
    createFloorSpace(createNewIdentity('Floorspace 1')),
    createHumanWorker(createNewIdentity('Human 1'), createVector3(3, 1, 0)),
    createFFFPrinter(createNewIdentity('Printer 1'), createVector3(0, -1, 0))
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

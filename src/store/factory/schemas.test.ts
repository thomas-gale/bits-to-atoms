import { denormalize, normalize } from 'normalizr';
import { createLiquidAsset } from '../economic/factories';
import { createFactory } from './factories';
import { factorySchema } from './schemas';
import { createHumanWorker } from './services/humanworker/factories';

test('can normalize factory', () => {
  // Arrange
  const testFactory = createFactory({
    id: 'test-factory-uuid',
    displayName: 'test-factory',
    liquidAsset: createLiquidAsset({
      id: 'test-liquid-asset-uuid',
      displayName: 'test-liquid-asset',
      dollars: 42
    }),
    fixedAssets: [],
    buildRequests: [],
    serviceProviders: [
      createHumanWorker({
        id: 'test-human-worker-uuid',
        displayName: 'test-human-worker'
      })
    ]
  });

  // Act
  const normalizedFactory = normalize(testFactory, factorySchema);

  // Assert
  expect(normalizedFactory).toEqual({
    entities: {
      assets: {
        'test-liquid-asset-uuid': testFactory.liquidAsset
      },
      serviceProviders: {
        'test-human-worker-uuid': testFactory.serviceProviders[0]
      }
    },
    result: {
      id: testFactory.id,
      displayName: testFactory.displayName,
      liquidAsset: 'test-liquid-asset-uuid',
      fixedAssets: [],
      buildRequests: [],
      serviceProviders: ['test-human-worker-uuid']
    }
  });
});

test('can denormalize factory', () => {
  // Arrange
  const normalizedTestFactory = {
    entities: {
      assets: {
        'test-liquid-asset-uuid': createLiquidAsset({
          id: 'test-liquid-asset-uuid',
          displayName: 'test-liquid-asset',
          dollars: 42
        })
      },
      serviceProviders: {
        'test-human-worker-uuid': createHumanWorker({
          id: 'test-human-worker-uuid',
          displayName: 'test-human-worker',
          currentCostPerTime: createLiquidAsset({
            id: 'human-worker-cost-per-time-uuid',
            displayName: 'human-worker-cost-per-time',
            dollars: 1e-6
          })
        })
      }
    },
    result: {
      id: 'test-factory-uuid',
      displayName: 'test-factory',
      liquidAsset: 'test-liquid-asset-uuid',
      fixedAssets: [],
      buildRequests: [],
      serviceProviders: ['test-human-worker-uuid']
    }
  };

  // Act
  const factory = denormalize(
    normalizedTestFactory.result,
    factorySchema,
    normalizedTestFactory.entities
  );

  // Assert
  expect(factory).toEqual(
    createFactory({
      id: 'test-factory-uuid',
      displayName: 'test-factory',
      liquidAsset: createLiquidAsset({
        id: 'test-liquid-asset-uuid',
        displayName: 'test-liquid-asset',
        dollars: 42
      }),
      fixedAssets: [],
      buildRequests: [],
      serviceProviders: [
        createHumanWorker({
          id: 'test-human-worker-uuid',
          displayName: 'test-human-worker',
          currentCostPerTime: createLiquidAsset({
            id: 'human-worker-cost-per-time-uuid',
            displayName: 'human-worker-cost-per-time',
            dollars: 1e-6
          })
        })
      ]
    })
  );
});

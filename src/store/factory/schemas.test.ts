import { denormalize, normalize } from 'normalizr';
import { createLiquidAsset } from '../economic/factories';
import { createFactory } from './factories';
import { factorySchema } from './schemas';
import { createHumanWorker } from './services/humanworker/factories';
import { createBuildRequest } from '../buildrequest/factories';
import { createSimplePolymerMaterial } from '../material/factories';

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
    buildRequests: [
      createBuildRequest({
        id: 'test-build-request-uuid',
        displayName: 'test-build-request'
      })
    ],
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
      buildRequests: {
        'test-build-request-uuid': testFactory.buildRequests[0]
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
      buildRequests: ['test-build-request-uuid'],
      serviceProviders: ['test-human-worker-uuid']
    }
  });
});

test('can denormalize factory', () => {
  // Arrange
  const testBuildRequest = createBuildRequest({
    id: 'test-build-request-uuid',
    displayName: 'test-build-request'
  });
  const testHumanService = createHumanWorker({
    id: 'test-human-worker-uuid',
    displayName: 'test-human-worker'
  })
  const normalizedTestFactory = {
    entities: {
      assets: {
        'test-liquid-asset-uuid': createLiquidAsset({
          id: 'test-liquid-asset-uuid',
          displayName: 'test-liquid-asset',
          dollars: 42
        })
      },
      buildRequests: {
        'test-build-request-uuid': testBuildRequest
      },
      serviceProviders: {
        'test-human-worker-uuid': testHumanService
      }
    },
    result: {
      id: 'test-factory-uuid',
      displayName: 'test-factory',
      liquidAsset: 'test-liquid-asset-uuid',
      fixedAssets: [],
      buildRequests: ['test-build-request-uuid'],
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
      buildRequests: [
        testBuildRequest
      ],
      serviceProviders: [
        testHumanService
      ]
    })
  );
});

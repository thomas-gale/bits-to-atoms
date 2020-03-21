import { normalize, denormalize } from 'normalizr';
import { factorySchema } from './schemas';
import { createExistingIdentity } from '../common/identity/factories';
import { createFactory } from './factories';
import { createLiquidAsset } from '../economic/factories';
import { createHumanWorker } from './services/humanworker/factories';

test('can normalize factory', () => {
  // Arrange
  const testFactoryIdentity = createExistingIdentity({
    displayName: 'test-factory',
    id: 'test-factory-uuid'
  });
  const testLiquidAssetIdentity = createExistingIdentity({
    displayName: 'test-liquid-asset',
    id: 'test-liquid-asset-uuid'
  });
  const testHumanWorkerIdentity = createExistingIdentity({
    displayName: 'test-human-worker',
    id: 'test-human-worker-uuid'
  });

  const testFactory = createFactory({
    id: testFactoryIdentity.id,
    displayName: testFactoryIdentity.displayName,
    liquidAsset: createLiquidAsset({
      id: testLiquidAssetIdentity,
      dollars: 42
    }),
    fixedAssets: [],
    buildRequests: [],
    serviceProviders: [
      createHumanWorker({
        id: testHumanWorkerIdentity
      })
    ]
  });

  // Act
  const normalizedFactory = normalize(testFactory, factorySchema);

  // Assert
  /*expect(normalizedFactory).toEqual({
    entities: {
      assets: {
              "[object Object]": Object {
                "dollars": 42,
                "id": "test-liquid-asset-uuid",
              },
            },
      identities: {
        'test-factory-uuid': testFactoryIdentity
      }
    }
    //result: { id: '945430d8-0fc3-4fc5-9489-2875b7b70906' }
  });*/
});

test('can denormalize factory', () => {
  // Arrange
  const normalizedTestFactory = {
    entities: {
      identities: {
        '945430d8-0fc3-4fc5-9489-2875b7b70906': {
          displayName: 'test-identity',
          id: '945430d8-0fc3-4fc5-9489-2875b7b70906'
        }
      }
    },
    result: { id: '945430d8-0fc3-4fc5-9489-2875b7b70906' }
  };

  // Act
  const factory = denormalize(
    { id: ['945430d8-0fc3-4fc5-9489-2875b7b70906'] },
    factorySchema,
    normalizedTestFactory
  );

  // Assert
  expect(factory).toEqual({
    id: {
      '0': '945430d8-0fc3-4fc5-9489-2875b7b70906'
    }
  });
});

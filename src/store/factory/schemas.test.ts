import { denormalize, normalize } from 'normalizr';
import { createLiquidAsset } from '../economic/factories';
import { createFactory } from './factories';
import { factorySchema } from './schemas';
import { createHumanWorker } from './services/humanworker/factories';
import { createBuildRequest } from '../buildrequest/factories';
import {
  createWorkflow,
  createTransportationActivity,
} from '../workflow/factories';

// Arrange for all factory schema tests
const testActivity1 = createTransportationActivity({
  id: 'test-transportation-activity-1-uuid',
});
const testActivity2 = createTransportationActivity({
  id: 'test-transportation-activity-2-uuid',
});
testActivity1.nextActivity = testActivity2;
testActivity2.previousActivity = testActivity1;

const testWorkflow = createWorkflow({
  id: 'test-build-request-workflow-uuid',
  displayName: 'test-build-request-workflow-uuid',
  activities: [testActivity1, testActivity2],
  firstActivity: testActivity1,
});
const testBuildRequest = createBuildRequest({
  id: 'test-build-request-uuid',
  displayName: 'test-build-request',
  workflow: testWorkflow,
});

const testHumanService = createHumanWorker({
  id: 'test-human-worker-uuid',
  displayName: 'test-human-worker',
});

const testFactory = createFactory({
  id: 'test-factory-uuid',
  displayName: 'test-factory',
  liquidAsset: createLiquidAsset({
    id: 'test-liquid-asset-uuid',
    displayName: 'test-liquid-asset',
    dollars: 42,
  }),
  fixedAssets: [],
  buildRequests: [testBuildRequest],
  serviceProviders: [testHumanService],
});

test('can normalize factory', () => {
  // Act
  const normalizedFactory = normalize(testFactory, factorySchema);

  // Assert
  expect(normalizedFactory).toEqual({
    entities: {
      activities: {
        [testActivity1.id]: {
          ...testActivity1,
          nextActivity: testActivity2.id,
        },
        [testActivity2.id]: {
          ...testActivity2,
          previousActivity: testActivity1.id,
        },
      },
      assets: {
        'test-liquid-asset-uuid': testFactory.liquidAsset,
      },
      buildRequests: {
        [testBuildRequest.id]: {
          ...testBuildRequest,
          workflow: testWorkflow.id,
        },
      },
      serviceProviders: {
        'test-human-worker-uuid': testFactory.serviceProviders[0],
      },
      workflows: {
        [testWorkflow.id]: {
          ...testWorkflow,
          activities: [testActivity1.id, testActivity2.id],
          firstActivity: testActivity1.id,
        },
      },
    },
    result: {
      id: testFactory.id,
      displayName: testFactory.displayName,
      liquidAsset: 'test-liquid-asset-uuid',
      fixedAssets: [],
      buildRequests: [testBuildRequest.id],
      serviceProviders: ['test-human-worker-uuid'],
    },
  });
});

test('can denormalize factory', () => {
  // Arrange
  const normalizedTestFactory = {
    entities: {
      activities: {
        [testActivity1.id]: {
          ...testActivity1,
          nextActivity: testActivity2.id,
        },
        [testActivity2.id]: {
          ...testActivity2,
          previousActivity: testActivity1.id,
        },
      },
      assets: {
        'test-liquid-asset-uuid': createLiquidAsset({
          id: 'test-liquid-asset-uuid',
          displayName: 'test-liquid-asset',
          dollars: 42,
        }),
      },
      buildRequests: {
        [testBuildRequest.id]: {
          ...testBuildRequest,
          workflow: testWorkflow.id,
        },
      },
      serviceProviders: {
        'test-human-worker-uuid': testHumanService,
      },
      workflows: {
        [testWorkflow.id]: {
          ...testWorkflow,
          activities: [testActivity1.id, testActivity2.id],
          firstActivity: testActivity1.id,
        },
      },
    },
    result: {
      id: 'test-factory-uuid',
      displayName: 'test-factory',
      liquidAsset: 'test-liquid-asset-uuid',
      fixedAssets: [],
      buildRequests: ['test-build-request-uuid'],
      serviceProviders: ['test-human-worker-uuid'],
    },
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
        dollars: 42,
      }),
      fixedAssets: [],
      buildRequests: [testBuildRequest],
      serviceProviders: [testHumanService],
    })
  );
});

import { normalize } from 'normalizr';
import { createFactory } from './factories';
import { factorySchema, FactorySchemaType, activitySchema } from './schemas';
import {
  factoryReducer,
  setDisplayName,
  setLiquidAssetDollars,
  addBuildRequest,
  updateBuildRequestWorkflow,
  updateActivity
} from './slice';
import { createBuildRequest } from '../buildrequest/factories';
import {
  createTransportationActivity,
  createWorkflow
} from '../workflow/factories';
import { Activity } from '../workflow/types';

const baseInitialState = normalize(createFactory(), factorySchema);

describe('factory slice', () => {
  it('should return the initial state', () => {
    expect(factoryReducer(baseInitialState, { type: {} })).toEqual(
      baseInitialState
    );
  });

  it('can set display name', () => {
    const expectedState = {
      ...baseInitialState,
      result: { ...baseInitialState.result, displayName: 'test-display-name' }
    };

    expect(
      factoryReducer(baseInitialState, setDisplayName('test-display-name'))
    ).toEqual(expectedState);
  });

  it('can set liquid asset dollars', () => {
    const expectedState = {
      ...baseInitialState,
      entities: {
        ...baseInitialState.entities,
        assets: {
          ...baseInitialState.entities.assets,
          [baseInitialState.result.liquidAsset]: {
            ...(baseInitialState.entities.assets
              ? baseInitialState.entities.assets[
                  baseInitialState.result.liquidAsset
                ]
              : {}),
            dollars: 12345
          }
        }
      }
    };

    expect(
      factoryReducer(baseInitialState, setLiquidAssetDollars(12345))
    ).toEqual(expectedState);
  });

  it('can add build request', () => {
    const buildRequest = createBuildRequest();
    const expectedState = {
      ...baseInitialState,
      entities: {
        ...baseInitialState.entities,
        buildRequests: {
          ...baseInitialState.entities.buildRequests,
          [buildRequest.id]: buildRequest
        }
      },
      result: {
        ...baseInitialState.result,
        buildRequests: [
          ...baseInitialState.result.buildRequests,
          buildRequest.id
        ]
      }
    };

    expect(
      factoryReducer(baseInitialState, addBuildRequest(buildRequest))
    ).toEqual(expectedState);
  });

  it('can update build request workflow', () => {
    // Initial state
    const buildRequest = createBuildRequest();
    const initialState = {
      ...baseInitialState,
      entities: {
        ...baseInitialState.entities,
        buildRequests: {
          ...baseInitialState.entities.buildRequests,
          [buildRequest.id]: buildRequest
        }
      },
      result: {
        ...baseInitialState.result,
        buildRequests: [
          ...baseInitialState.result.buildRequests,
          buildRequest.id
        ]
      }
    } as FactorySchemaType;

    // Expected state.
    const testActivity = createTransportationActivity();
    const testWorkflow = createWorkflow({
      activities: [testActivity],
      firstActivity: testActivity
    });
    const expectedState = {
      ...initialState,
      entities: {
        ...initialState.entities,
        activities: {
          ...initialState.entities.activities,
          [testActivity.id]: testActivity
        },
        buildRequests: {
          ...initialState.entities.buildRequests,
          [buildRequest.id]: buildRequest
        },
        workflows: {
          ...initialState.entities.workflows,
          [testWorkflow.id]: {
            ...testWorkflow,
            activities: [testActivity.id],
            firstActivity: testActivity.id
          }
        }
      },
      result: {
        ...initialState.result
      }
    };

    expect(
      factoryReducer(
        initialState,
        updateBuildRequestWorkflow({
          buildRequestId: buildRequest.id,
          workflow: testWorkflow
        })
      )
    ).toEqual(expectedState);
  });

  it('can update activity', () => {
    // Initial State
    const testActivity = createTransportationActivity();
    const testWorkflow = createWorkflow({
      activities: [testActivity],
      firstActivity: testActivity
    });
    const buildRequest = createBuildRequest({
      workflow: testWorkflow
    });
    const initialState = normalize(
      createFactory({
        buildRequests: [buildRequest]
      }),
      factorySchema
    );

    // Expected State
    const updatedTestActivity = {
      ...testActivity,
      displayName: 'new-test-activity-name',
      started: new Date()
    } as Activity;
    const normUpdatedTestActivity = normalize(
      updatedTestActivity,
      activitySchema
    );

    const expectedState = {
      ...initialState,
      entities: {
        ...initialState.entities,
        ...normUpdatedTestActivity.entities
      }
    };

    expect(
      factoryReducer(initialState, updateActivity(updatedTestActivity))
    ).toEqual(expectedState);
  });
});

import { normalize } from 'normalizr';
import { createFactory } from './factories';
import { factorySchema, FactorySchemaType } from './schemas';
import {
  factoryReducer,
  setDisplayName,
  setLiquidAssetDollars,
  addBuildRequest,
  updateBuildRequestWorkflow
} from './slice';
import { createBuildRequest } from '../buildrequest/factories';
import {
  createTransportationActivity,
  createWorkflow
} from '../workflow/factories';

const initialState = normalize(createFactory(), factorySchema);

describe('factory slice', () => {
  it('should return the initial state', () => {
    expect(factoryReducer(initialState, { type: {} })).toEqual(initialState);
  });

  it('can set display name', () => {
    const expectedState = {
      ...initialState,
      result: { ...initialState.result, displayName: 'test-display-name' }
    };
    expect(
      factoryReducer(initialState, setDisplayName('test-display-name'))
    ).toEqual(expectedState);
  });

  it('can set liquid asset dollars', () => {
    const expectedState = {
      ...initialState,
      entities: {
        ...initialState.entities,
        assets: {
          ...initialState.entities.assets,
          [initialState.result.liquidAsset]: {
            ...(initialState.entities.assets
              ? initialState.entities.assets[initialState.result.liquidAsset]
              : {}),
            dollars: 12345
          }
        }
      }
    };
    expect(factoryReducer(initialState, setLiquidAssetDollars(12345))).toEqual(
      expectedState
    );
  });

  it('can add build request', () => {
    const buildRequest = createBuildRequest();
    const expectedState = {
      ...initialState,
      entities: {
        ...initialState.entities,
        buildRequests: {
          ...initialState.entities.buildRequests,
          [buildRequest.id]: buildRequest
        }
      },
      result: {
        ...initialState.result,
        buildRequests: [...initialState.result.buildRequests, buildRequest.id]
      }
    };
    expect(factoryReducer(initialState, addBuildRequest(buildRequest))).toEqual(
      expectedState
    );
  });

  it('can update build request workflow', () => {
    // Initial state
    const buildRequest = createBuildRequest();
    const initialWorkflowState = {
      ...initialState,
      entities: {
        ...initialState.entities,
        buildRequests: {
          ...initialState.entities.buildRequests,
          [buildRequest.id]: buildRequest
        }
      },
      result: {
        ...initialState.result,
        buildRequests: [...initialState.result.buildRequests, buildRequest.id]
      }
    } as FactorySchemaType;

    // Expected state.
    const testActivity = createTransportationActivity();
    const testWorkflow = createWorkflow({
      activities: [testActivity],
      firstActivity: testActivity
    });
    const expectedState = {
      ...initialWorkflowState,
      entities: {
        ...initialWorkflowState.entities,
        activities: {
          ...initialWorkflowState.entities.activities,
          [testActivity.id]: testActivity
        },
        buildRequests: {
          ...initialWorkflowState.entities.buildRequests,
          [buildRequest.id]: buildRequest
        },
        workflows: {
          ...initialWorkflowState.entities.workflows,
          [testWorkflow.id]: {
            ...testWorkflow,
            activities: [testActivity.id],
            firstActivity: testActivity.id
          }
        }
      },
      result: {
        ...initialWorkflowState.result
      }
    };
    expect(
      factoryReducer(
        initialWorkflowState,
        updateBuildRequestWorkflow({
          buildRequestId: buildRequest.id,
          workflow: testWorkflow
        })
      )
    ).toEqual(expectedState);
  });
});

import { expectSaga } from 'redux-saga-test-plan';
import { buildRequestWorkflowSaga } from './sagas';
import { createBuildRequest } from '../buildrequest/factories';
import { addBuildRequest, requestFullfillmentOfActivity } from './slice';
import { call } from 'redux-saga/effects';

describe('factory sagas', () => {
  it('first step in build request workflow is request transmutation', () => {
    // Arrange
    const buildRequest = createBuildRequest({
      displayName: 'test-build-request',
    });

    // Act
    // http://redux-saga-test-plan.jeremyfairbank.com/unit-testing/
    // http://redux-saga-test-plan.jeremyfairbank.com/integration-testing/partial-matching.html
    expectSaga(buildRequestWorkflowSaga, {
      type: addBuildRequest.type,
      payload: buildRequest,
    })
      .put.like({
        action: {
          type: 'factory/requestFullfillmentOfActivity',
          payload: {
            type: 'Transmutation',
          },
        },
      })
      .silentRun();
  });
});

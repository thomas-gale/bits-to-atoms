import { runSaga } from 'redux-saga';
import { buildRequestWorkflowSaga } from './sagas';
import { createBuildRequest } from '../buildrequest/factories';
import { addBuildRequest } from './slice';

describe('factory sagas', () => {
  it('should execute the build request workflow saga when build request added', async () => {
    // Arrange
    const buildRequest = createBuildRequest({
      displayName: 'test-build-request',
    });
    const dispatched = [];

    // Act
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      buildRequestWorkflowSaga,
      {
        type: addBuildRequest.type,
        payload: buildRequest,
      }
    );

    // Assert
    expect(dispatched).toHaveLength(1);
  });
});

import { expectSaga } from 'redux-saga-test-plan';
import { setIdentity, setClient, setThread, setToken } from './slice';
import {
  experimentalTextileSaga,
  generateIdentitySaga,
} from './user-identity-sagas';

jest.setTimeout(100000);

describe('textile sagas', () => {
  it.skip('should run the generate identity saga', () => {
    // Act / Assert
    return expectSaga(generateIdentitySaga)
      .put.like({
        action: { type: setIdentity.type },
      })
      .run();
  });
  it('should run the experimental textile e2e saga', () => {
    // Act / Assert
    return expectSaga(experimentalTextileSaga)
      .put.like({
        action: { type: setIdentity.type },
      })
      .put.like({
        action: { type: setToken.type },
      })
      .put.like({
        action: { type: setClient.type },
      })
      .put.like({
        action: { type: setThread.type },
      })
      .run(100000);
  });
});

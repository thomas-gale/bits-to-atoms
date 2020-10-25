import { expectSaga } from 'redux-saga-test-plan';
import { setToken, setUser } from './slice';
import {
  experimentalTextileSaga,
  generateIdentitySaga,
} from './user-identity-sagas';

describe('textile sagas', () => {
  it('should run the generate identity saga', () => {
    // Act / Assert
    return expectSaga(generateIdentitySaga)
      .put.like({
        action: { type: setUser.type },
      })
      .run();
  });
  it('should run the experimental textile e2e saga', () => {
    // Act / Assert
    return expectSaga(experimentalTextileSaga)
      .put.like({
        action: { type: setUser.type },
      })
      .put.like({
        action: { type: setToken.type },
      })
      .run(1000);
  });
});

import { assert } from 'console';
import { runSaga } from 'redux-saga';
import { gunLoadSaga } from './sagas';

describe('gun sagas', () => {
  it('should load gun', async () => {
    // Arrange

    // Act
    const result = await runSaga({}, gunLoadSaga);

    // Assert
    expect(result).toBeDefined();
  });
});

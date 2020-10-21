import { generateIdentitySaga } from './user-identity-sagas';

beforeEach(() => {
  require('text-encoding-polyfill');
  require('web-encoding');
});

describe('textile sagas', () => {
  it('should run the generate identity saga', async () => {
    // Arrange

    // Act
    const gen = generateIdentitySaga();

    // Assert
    expect(gen.next().value).toBeDefined();
  });
});

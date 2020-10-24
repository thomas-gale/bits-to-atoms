import { generateIdentitySaga } from './user-identity-sagas';

describe('textile sagas', () => {
  it('should run the generate identity saga', async () => {
    // Arrange

    // Act
    const gen = generateIdentitySaga();

    // Assert
    expect(gen.next().value).toBeDefined();
  });
});

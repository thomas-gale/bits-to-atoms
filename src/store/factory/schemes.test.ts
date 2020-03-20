import { normalize } from 'normalizr';
import { identitySchema, factorySchema } from './schemes';
import { createExistingIdentity } from '../common/identity/factories';

test('normalizr tests', () => {
  // Arrange
  const fixedUuid = '945430d8-0fc3-4fc5-9489-2875b7b70906';
  const testIdentity = createExistingIdentity({
    displayName: 'test-identity',
    id: fixedUuid
  });
  const testFactory = { identity: testIdentity };

  // Act
  const normalizedFactory = normalize(testFactory, factorySchema);

  // Assert
  expect(normalizedFactory).toEqual({
    entities: {
      identity: {
        '945430d8-0fc3-4fc5-9489-2875b7b70906': {
          displayName: 'test-identity',
          id: '945430d8-0fc3-4fc5-9489-2875b7b70906'
        }
      }
    },
    result: { identity: '945430d8-0fc3-4fc5-9489-2875b7b70906' }
  });
});

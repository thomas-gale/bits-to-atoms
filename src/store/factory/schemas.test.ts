import { normalize, denormalize } from 'normalizr';
import { identitySchema, factorySchema } from './schemas';
import { createExistingIdentity } from '../common/identity/factories';
import { createFactory } from './factories';

test('can normalize factory', () => {
  // Arrange
  const fixedUuid = '945430d8-0fc3-4fc5-9489-2875b7b70906';
  const testIdentity = createExistingIdentity({
    displayName: 'test-identity',
    id: fixedUuid
  });
  const testFactory = createFactory({
    id: testIdentity
  });

  // Act
  const normalizedFactory = normalize(testFactory, factorySchema);

  // Assert
  expect(normalizedFactory).toEqual({
    entities: {
      identities: {
        '945430d8-0fc3-4fc5-9489-2875b7b70906': {
          displayName: 'test-identity',
          id: '945430d8-0fc3-4fc5-9489-2875b7b70906'
        }
      }
    },
    //result: { id: '945430d8-0fc3-4fc5-9489-2875b7b70906' }
  });
});

test('can denormalize factory', () => {
  // Arrange
  const normalizedTestFactory = {
    entities: {
      identities: {
        '945430d8-0fc3-4fc5-9489-2875b7b70906': {
          displayName: 'test-identity',
          id: '945430d8-0fc3-4fc5-9489-2875b7b70906'
        }
      }
    },
    result: { id: '945430d8-0fc3-4fc5-9489-2875b7b70906' }
  };

  // Act
  const factoryEntities = {  }
  const factory = denormalize({ id: ['945430d8-0fc3-4fc5-9489-2875b7b70906'] }, factorySchema, normalizedTestFactory);

  // Assert
  expect(factory).toEqual({
    id: {
      "0": '945430d8-0fc3-4fc5-9489-2875b7b70906'
    }
  });
});

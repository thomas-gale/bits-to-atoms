import { normalize } from 'normalizr';
import { identity, factory } from './schemes';
import { createNewIdentity } from '../common/identity/factories';

test('normalizr tests', () => {
   // Arrange 
   const testIdentity = createNewIdentity({ displayName: 'test-identity'});
   const testFactory = { identity: testIdentity };

   // Act 
   const normalizedFactory = normalize(testFactory, factory);

   // Assert
   console.log(normalizedFactory);
   //expect(normalizedFactory).;
});


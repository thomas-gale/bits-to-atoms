import { schema } from 'normalizr';

// Test placing all schemes here. They will need moving to correct directories.
export const identitySchema = new schema.Entity('identity');

export const factorySchema = {
  identity: identitySchema
};

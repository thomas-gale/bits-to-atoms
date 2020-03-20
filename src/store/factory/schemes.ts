import { schema } from 'normalizr';

// Test placing all schemes here. They will need moving to correct directories.
export const identity = new schema.Entity('identity');

export const factory = {
    identity: identity
}
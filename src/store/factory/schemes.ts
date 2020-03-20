import { schema } from 'normalizr';

// Test placing all schemes here. They will need moving to correct directories.
export const identitySchema = new schema.Entity('identities');

export const activitySchema = new schema.Entity(
  'activities',
  {
    id: identitySchema
  },
  {}
);

export const workflowSchema = new schema.Entity(
  'workflows',
  {
    id: identitySchema,
    activities: [activitySchema]
  },
  {}
);

export const buildRequestSchema = new schema.Entity(
    'buildRequests',
    {
      id: identitySchema,
      workflow: workflowSchema,
      firstActivity: activitySchema
    },
    {}
  );

export const factorySchema = {
  id: identitySchema,
  buildRequests: [buildRequestSchema]
};

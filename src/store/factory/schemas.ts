import { schema } from 'normalizr';

// Test placing all schemes here. They will need moving to correct directories.
export const assetSchema = new schema.Entity('assets');

export const serviceProviderSchema = new schema.Entity('serviceProviders');

export const activitySchema = new schema.Entity('activities');

export const workflowSchema = new schema.Entity('workflows');

export const buildRequestSchema = new schema.Entity(
  'buildRequests',
  {
    workflow: workflowSchema,
    firstActivity: activitySchema
  },
  {}
);

export const factorySchema = {
  liquidAsset: assetSchema,
  fixedAssets: [assetSchema],
  buildRequests: [buildRequestSchema],
  serviceProviders: [serviceProviderSchema]
};

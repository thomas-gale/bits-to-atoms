import { schema, NormalizedSchema } from 'normalizr';

// Test placing all schemes here. They will need moving to correct directories.
export const assetSchema = new schema.Entity('assets');

export const serviceProviderSchema = new schema.Entity('serviceProviders');

export const activitySchema = new schema.Entity(
  'activities',
  {
    serviceProvider: serviceProviderSchema
  },
  {}
);
activitySchema.define({
  previousActivity: activitySchema,
  nextActivity: activitySchema
});

export const workflowSchema = new schema.Entity(
  'workflows',
  {
    activities: [activitySchema],
    firstActivity: activitySchema
  },
  {}
);

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
  serviceProviders: [serviceProviderSchema],
  buildRequests: [buildRequestSchema]
};

export type FactorySchemaType = NormalizedSchema<
  {
    [key: string]:
      | {
          [key: string]: any;
        }
      | undefined;
  },
  any
>;

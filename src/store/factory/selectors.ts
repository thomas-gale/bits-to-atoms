import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { config } from '../../env/config';
import { BuildRequest } from '../buildrequest/types';
import { Identity } from '../common/identity/types';
import { createLiquidAsset } from '../economic/factories';
import { EconomicSummary, LiquidAsset } from '../economic/types';
import { RootState } from '../index';
import { ActivityType } from '../workflow/types';
import { factorySchema, FactorySchemaType } from './schemas';
import {
  ServiceProvider,
  TransmutationServiceProvider
} from './services/types';

/*export const factorySelector = (state: RootState): FactorySchemaType =>
  state.factory;*/

const factoryIdSelector = (state: RootState) =>
  state.factory.result.id as string | undefined;
const factoryDisplayNameSelector = (state: RootState) =>
  state.factory.result.displayName as string | undefined;
const factoryLiquidAssetIdSelector = (state: RootState) =>
  state.factory.result.liquidAsset as string | undefined;
const factoryFixedAssetsIdsSelector = (state: RootState) =>
  state.factory.result.fixedAssets as string[] | undefined;
const factoryBuildRequestsIdsSelector = (state: RootState) =>
  state.factory.result.buildRequests as string[] | undefined;
const factoryServiceProvidersIdsSelector = (state: RootState) =>
  state.factory.result.serviceProviders as string[] | undefined;

const factoryEntitiesActivitiesSelector = (state: RootState) =>
  state.factory.entities.activities as FactorySchemaType | undefined;
const factoryEntitiesAssetsSelector = (state: RootState) =>
  state.factory.entities.assets as FactorySchemaType | undefined;
const factoryEntitiesBuildRequestsSelector = (state: RootState) =>
  state.factory.entities.buildRequests as FactorySchemaType | undefined;
const factoryEntitiesServiceProvidersSelector = (state: RootState) =>
  state.factory.entities.serviceProviders as FactorySchemaType | undefined;
const factoryEntitiesWorkflowsSelector = (state: RootState) =>
  state.factory.entities.workflows as FactorySchemaType | undefined;

/*
export const factoryStructuredSelector = createStructuredSelector<FactorySchemaType, FactorySchemaType>({
  entities: createStructuredSelector<FactorySchemaType, any>({
    activities: factoryEntitiesActivitiesSelector,
    assets: factoryEntitiesAssetsSelector,
    buildRequests: factoryEntitiesBuildRequestsSelector,
    serviceProviders: factoryEntitiesServiceProvidersSelector,
    workflows: factoryEntitiesWorkflowsSelector,
  }),
  result: createStructuredSelector({

  })
});*/

export const factoryIdentitySelector = createSelector(
  [factoryIdSelector, factoryDisplayNameSelector],
  (factoryId: string | undefined, factoryDisplayName: string | undefined) => {
    return {
      id: factoryId ? factoryId : 'undefined',
      displayName: factoryDisplayName ? factoryDisplayName : 'undefined'
    } as Identity;
  }
);

export const factoryLiquidAssetSelector = createSelector(
  [factoryLiquidAssetIdSelector, factoryEntitiesAssetsSelector],
  (
    factoryLiquidAssetId: string | undefined,
    factoryEntitiesAssets: FactorySchemaType | undefined
  ): LiquidAsset => {
    return denormalize(
      {
        liquidAsset: factoryLiquidAssetId
      },
      factorySchema,
      {
        assets: factoryEntitiesAssets
      }
    ).liquidAsset as LiquidAsset;
  }
);

export const factoryBuildRequestsSelector = createSelector(
  [
    factoryBuildRequestsIdsSelector,
    factoryEntitiesActivitiesSelector,
    factoryEntitiesBuildRequestsSelector,
    factoryEntitiesServiceProvidersSelector,
    factoryEntitiesWorkflowsSelector
  ],
  (
    factoryBuildRequestsIds: string[] | undefined,
    factoryEntitiesActivities: FactorySchemaType | undefined,
    factoryEntitiesBuildRequests: FactorySchemaType | undefined,
    factoryEntitiesServiceProviders: FactorySchemaType | undefined,
    factoryEntitiesWorkflows: FactorySchemaType | undefined
  ): BuildRequest[] => {
    return denormalize(
      {
        buildRequests: factoryBuildRequestsIds
      },
      factorySchema,
      {
        activities: factoryEntitiesActivities,
        buildRequests: factoryEntitiesBuildRequests,
        serviceProviders: factoryEntitiesServiceProviders,
        workflows: factoryEntitiesWorkflows
      }
    ).buildRequests as BuildRequest[];
  }
);

export const isAllowedToBidSelector = createSelector(
  [factoryBuildRequestsSelector],
  (factoryActiveBuildRequests: BuildRequest[]) => {
    return (
      factoryActiveBuildRequests.length < config.factory.maxNumberActiveBuilds
    );
  }
);

export const factoryServiceProvidersSelector = createSelector(
  [factoryServiceProvidersIdsSelector, factoryEntitiesServiceProvidersSelector],
  (
    factoryServiceProvidersIds: string[] | undefined,
    factoryEntitiesServiceProviders: FactorySchemaType | undefined
  ): ServiceProvider[] => {
    return denormalize(
      {
        serviceProviders: factoryServiceProvidersIds
      },
      factorySchema,
      {
        serviceProviders: factoryEntitiesServiceProviders
      }
    ).serviceProviders as ServiceProvider[];
  }
);

export const factoryTransmutationServiceProvidersSelector = createSelector(
  [factoryServiceProvidersSelector],
  (
    factoryServiceProviders: ServiceProvider[]
  ): TransmutationServiceProvider[] => {
    return factoryServiceProviders.filter(
      sp =>
        sp.capabilities.find(cap => cap === ActivityType.Transmutation) !==
        undefined
    ) as TransmutationServiceProvider[];
  }
);

export const currentServiceProviderCostPerTimeSelector = createSelector(
  [factoryServiceProvidersSelector],
  (serviceProviders: ServiceProvider[]): LiquidAsset => {
    let currentServiceProvidersCostPerSecond = 0;
    serviceProviders.forEach(p => {
      currentServiceProvidersCostPerSecond += p.currentCostPerTime.dollars;
    });
    return createLiquidAsset({ dollars: currentServiceProvidersCostPerSecond });
  }
);

/**
 * WIP: This could do with a spot of work figuring out the total in / out metric
 * Should this be an average rate over a fixed period (e.g. 1 / 5 / 10min)?
 */
export const factoryEconomicSummarySelector = createSelector(
  [factoryLiquidAssetSelector, factoryServiceProvidersSelector],
  (
    liquidAsset: LiquidAsset,
    serviceProviders: ServiceProvider[]
  ): EconomicSummary => {
    // Compute total asset value
    /*const currentAssetsValue = assets.reduce((prev, curr) => {
      return { dollars: prev.dollars + curr.dollars };
    });*/

    // Compute total service provider cost per second
    let currentServiceProvidersCostPerSecond = 0;
    serviceProviders.forEach(p => {
      currentServiceProvidersCostPerSecond += p.currentCostPerTime.dollars;
    });

    return {
      currentAssetsValue: liquidAsset,
      totalOut: createLiquidAsset({
        dollars: currentServiceProvidersCostPerSecond
      }),
      totalIn: createLiquidAsset({ dollars: 0 })
    };
  }
);

/*
export const factoryActivitiesSelector = createSelector(
  [factorySelector],
  (factory: FactorySchemaType): Activity[] => {
    return denormalize({
      buildrequests: [...factory.result.buildRequests]
    },
    factorySchema,
    factory.entities
    ) as Activity[]
  });

export const factoryIncompleteActivitiesSelector = createSelector(
  [factoryActivitiesSelector],
  (activities: Activity[]): Activity[] =>
    activities.filter(activity => !activity.completed)
);

export const factoryUnassignedActivitiesSelector = createSelector(
  [factoryActivitiesSelector],
  (activities: Activity[]): Activity[] =>
    activities.filter(activity => !activity.serviceProviderId)
);

export const factoryUnAllocatedActivitiesSelector = createSelector(
  [factoryActiveBuildRequestsSelector],
  (activeBuildRequests: BuildRequest[]): Activity[] => {
    // Loop over active build request and each workflow.
    const unAllocatedActivities = [] as Activity[];
    activeBuildRequests.forEach(activeBuildRequest => {
      activeBuildRequest.workflow?.activities.forEach(activity => {
        if (activity.serviceProviderId === undefined) {
          unAllocatedActivities.push(activity);
        }
      });
    });
    return unAllocatedActivities;
  }
);*/

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

export const factorySelector = (state: RootState): FactorySchemaType =>
  state.factory;

export const factoryIdentitySelector = createSelector(
  [factorySelector],
  (factory: FactorySchemaType) => {
    return {
      id: factory.result.id,
      displayName: factory.result.displayName
    } as Identity;
  }
);

export const factoryLiquidAssetSelector = createSelector(
  [factorySelector],
  (factory: FactorySchemaType): LiquidAsset => {
    return denormalize(
      {
        liquidAsset: factory.result.liquidAsset
      },
      factorySchema,
      factory.entities
    ) as LiquidAsset;
  }
);

export const factoryBuildRequestsSelector = createSelector(
  [factorySelector],
  (factory: FactorySchemaType): BuildRequest[] => {
    return denormalize(
      {
        buildrequests: [...factory.result.buildRequests]
      },
      factorySchema,
      factory.entities
    ) as BuildRequest[];
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
  [factorySelector],
  (factory: FactorySchemaType): ServiceProvider[] => {
    return denormalize(
      {
        serviceProviders: [...factory.result.serviceProviders]
      },
      factorySchema,
      factory.entities
    ) as ServiceProvider[];
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

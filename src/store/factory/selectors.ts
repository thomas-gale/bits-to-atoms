import { createSelector } from 'reselect';
import { RootState } from '../index';
import { Factory } from './types';
import { EconomicSummary, LiquidAsset } from '../economic/types';
import {
  ServiceProvider,
  TransmutationServiceProvider
} from './services/types';
import { createLiquidAsset } from '../economic/factories';
import { BuildRequest } from '../buildrequest/types';
import { config } from '../../env/config';
import { ActivityType, Activity } from '../workflow/types';
import { denormalize } from 'normalizr';
import { factorySchema } from './schemas';

export const factorySelector = (state: RootState) => denormalize(state.factory.result, factorySchema, state.factory.entities);

export const factoryActiveBuildRequestsSelector = createSelector(
  [factorySelector],
  (factory: Factory): BuildRequest[] => {
    // Denormalise factory build requests.
    return factory.buildRequests;
  }
);

/**
 * Flatten the activity structure into a single array of activities inside all of the
 * Active Build Requests of the factory.
 */
export const factoryActivitiesSelector = createSelector(
  [factoryActiveBuildRequestsSelector],
  (buildRequests: BuildRequest[]): Activity[] => {
    const activities = [] as Activity[];
    for (const buildRequest of buildRequests) {
      if (buildRequest.workflow) {
        for (const activity of buildRequest.workflow.activities) {
          activities.push(activity);
        }
      }
    }
    return activities;
  }
);

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
);

export const isAllowedToBidSelector = createSelector(
  [factoryActiveBuildRequestsSelector],
  (factoryActiveBuildRequests: BuildRequest[]) => {
    return (
      factoryActiveBuildRequests.length < config.factory.maxNumberActiveBuilds
    );
  }
);

export const factoryLiquidAssetSelector = createSelector(
  [factorySelector],
  (factory: Factory): LiquidAsset => {
    return factory.liquidAsset;
  }
);

export const factoryServiceProvidersSelector = createSelector(
  [factorySelector],
  (factory: Factory): ServiceProvider[] => {
    return factory.serviceProviders;
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

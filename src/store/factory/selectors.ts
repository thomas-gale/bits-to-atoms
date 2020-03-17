import { createSelector } from 'reselect';
import { RootState } from '../index';
import { Factory } from './types';
import { InputRegion, OutputRegion } from './boundaries/types';
import { EconomicSummary, LiquidAsset } from '../economic/types';
import {
  ServiceProvider,
  TransmutationServiceProvider
} from './services/types';
import { createLiquidAsset } from '../economic/factories';
import { BuildRequest } from '../buildrequest/types';
import { config } from '../../env/config';
import { ActivityType, Activity } from '../workflow/types';

export const factorySelector = (state: RootState) => state.factory;

export const factoryActiveBuildRequestsSelector = createSelector(
  [factorySelector],
  (factory: Factory): BuildRequest[] => {
    return factory.activeBuildRequests;
  }
);

/*export const factoryOpenActivitieIdssSelector = createSelector(
  [factorySelector],
  (factory: Factory): Identity[] => {
    return factory.openActivities;
  }
);*/

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

/*
  activeBuildRequests: BuildRequest[];
  openActivities: Identity[];
  serviceProviders: ServiceProvider[];


     const indexToUpdate = state.openActivities.findIndex(
        a => a.uuid === action.payload.identity.uuid
      );
      if (indexToUpdate === -1) {
        console.error(
          `Unable to find to update open activity ${action.payload.identity.uuid}`
        );
        return; // Don't do anything if we can't find that element
      }

      // TD. The following steps show that we need to think carefully about this structure, maybe try to better normalise it.
      // We need to search through each active build request trying to match up the workflow.
      for (const activeBuildRequest of state.activeBuildRequests) {
        if (activeBuildRequest.workflow) {
          for (let activity of activeBuildRequest.workflow.activities) {
            if (activity.identity.uuid === action.payload.identity.uuid) {
              activity = action.payload;
              return;
            }
          }
        }
      }
      console.error(
        `Unable to find to update open activity ${action.payload.identity.uuid}`
      );


*/

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

export const factoryInputRegionSelector = createSelector(
  [factorySelector],
  (factory: Factory): InputRegion => {
    return factory.inputRegion;
  }
);

export const factoryOutputRegionSelector = createSelector(
  [factorySelector],
  (factory: Factory): OutputRegion => {
    return factory.outputRegion;
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

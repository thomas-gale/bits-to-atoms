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
import { ActivityType } from '../workflow/types';

export const factorySelector = (state: RootState) => state.factory;

export const factoryActiveBuildRequestsSelector = createSelector(
  [factorySelector],
  (factory: Factory): BuildRequest[] => {
    return factory.activeBuildRequests;
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

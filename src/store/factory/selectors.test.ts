import { normalize } from 'normalizr';
import { RootState } from '..';
import { createBuildRequest } from '../buildrequest/factories';
import { Identity } from '../common/identity/types';
import {
  createTransmutationActivity,
  createTransportationActivity,
  createWorkflow
} from '../workflow/factories';
import { createFactory } from './factories';
import { factorySchema } from './schemas';
import {
  factoryBuildRequestsSelector,
  factoryIdentitySelector,
  factoryLiquidAssetSelector,
  factorySelector,
  factoryServiceProvidersSelector
} from './selectors';
import { createHumanWorker } from './services/humanworker/factories';

// Initial State
const testActivity1 = createTransportationActivity();
const testActivity2 = createTransmutationActivity();
testActivity1.nextActivity = testActivity2;
testActivity2.previousActivity = testActivity1;
const testWorkflow = createWorkflow({
  activities: [testActivity1, testActivity2],
  firstActivity: testActivity1
});
const testBuildRequest = createBuildRequest({
  workflow: testWorkflow
});
const testHumanServiceProvider = createHumanWorker();
const startingFactory = createFactory({
  buildRequests: [testBuildRequest],
  serviceProviders: [testHumanServiceProvider]
});
const baseStoreInitialState = {
  factory: normalize(startingFactory, factorySchema)
} as RootState;

describe('factory selectors', () => {
  it('should return the factory normalised state slice', () => {
    expect(factorySelector(baseStoreInitialState)).toEqual(
      baseStoreInitialState.factory
    );
  });
  it('should return the factory identity', () => {
    expect(factoryIdentitySelector(baseStoreInitialState)).toEqual({
      id: startingFactory.id,
      displayName: startingFactory.displayName
    } as Identity);
  });
  it('should return the factory liquid asset', () => {
    expect(factoryLiquidAssetSelector(baseStoreInitialState)).toEqual(
      startingFactory.liquidAsset
    );
  });
  it('should return the factory build requests', () => {
    expect(factoryBuildRequestsSelector(baseStoreInitialState)).toEqual(
      startingFactory.buildRequests
    );
  });
  it('should return the factory service providers', () => {
    expect(factoryServiceProvidersSelector(baseStoreInitialState)).toEqual(
      startingFactory.serviceProviders
    );
  });
});

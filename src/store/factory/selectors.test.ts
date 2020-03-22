import { normalize } from 'normalizr';
import { RootState } from '..';
import { createFactory } from './factories';
import { factorySchema } from './schemas';
import { factorySelector, factoryIdentitySelector } from './selectors';
import { Identity } from '../common/identity/types';

const startingFactory = createFactory();
const baseInitialState = {
  factory: normalize(startingFactory, factorySchema)
} as RootState;

describe('factory selectors', () => {
  it('factory selector should return the factory normalised state slice', () => {
    expect(factorySelector(baseInitialState)).toEqual(baseInitialState.factory);
  });
  it('factory identity selector should return the factory identity', () => {
    expect(factoryIdentitySelector(baseInitialState)).toEqual({
      id: startingFactory.id,
      displayName: startingFactory.displayName
    } as Identity);
  });
});

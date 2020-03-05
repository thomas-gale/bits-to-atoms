import { createSelector } from 'reselect';
import { RootState } from '../index';
import { ServiceProvider } from '../factory/services/types';
import { Parameter } from '../common/parameter/types';
import { createNumberParameter } from '../common/parameter/factories';
import { createExistingIdentity } from '../common/identity/factories';
import { Identity } from '../common/identity/types';
import { factoryServiceProvidersSelector } from '../factory/selectors';

export const selectedServiceProviderIdSelector = (state: RootState) => state.selected.selectedServiceProviderId;

export const selectedServiceProviderSelector = createSelector(
  [factoryServiceProvidersSelector, selectedServiceProviderIdSelector],
  (factoryServiceProviders: ServiceProvider[], selectedServiceProviderId: Identity): ServiceProvider | undefined => {
    return factoryServiceProviders.find(sp => sp.id.uuid === selectedServiceProviderId.uuid)
  }
)

export const getSelectedParametersSelector = createSelector(
  [selectedServiceProviderSelector],
  (selected: ServiceProvider | undefined): Parameter[] => {
    if (!selected) return [];
    return [
      createNumberParameter(
        createExistingIdentity('Location X', 'locationX'),
        'm',
        selected.location.x
      ),
      createNumberParameter(
        createExistingIdentity('Location Y', 'locationY'),
        'm',
        selected.location.y
      ),
      createNumberParameter(
        createExistingIdentity('Location Z', 'locationZ'),
        'm',
        selected.location.z
      )
    ];
  }
);

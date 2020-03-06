import { createSelector } from 'reselect';
import { RootState } from '../index';
import { ServiceProvider } from '../factory/services/types';
//import { Parameter } from '../common/parameter/types';
//import { createNumberParameter } from '../common/parameter/factories';
//import { createExistingIdentity } from '../common/identity/factories';
import { Identity } from '../common/identity/types';
import { factoryServiceProvidersSelector } from '../factory/selectors';
//import { LocationParameters } from './types';

export const selectedServiceProviderIdSelector = (state: RootState) =>
  state.selected.selectedServiceProviderId;

export const selectedServiceProviderSelector = createSelector(
  [factoryServiceProvidersSelector, selectedServiceProviderIdSelector],
  (
    factoryServiceProviders: ServiceProvider[],
    selectedServiceProviderId: Identity
  ): ServiceProvider | undefined => {
    return factoryServiceProviders.find(
      sp => sp.id.uuid === selectedServiceProviderId.uuid
    );
  }
);

/*export const selectedParametersSelector = createSelector(
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

export const selectedParameterInitialValuesSelector = createSelector(
  [selectedParametersSelector],
  (parameters: Parameter[]): LocationParameters => {
    const initialParameterValues: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
    parameters.forEach(parameter => {
      initialParameterValues[parameter.identity.uuid] = parameter.value;
    });
    return initialParameterValues as LocationParameters;
  }
);*/

import { createSelector } from 'reselect';
import { RootState } from '../index';
import { ServiceProvider } from '../factory/services/types';
import { Parameter } from '../common/parameter/types';
import { createNumberParameter } from '../common/parameter/factories';
import { createExistingIdentity } from '../common/identity/factories';

export const selectedSelector = (state: RootState) => state.selected;

export const getSelectedParametersSelector = createSelector(
  [selectedSelector],
  (selected: ServiceProvider): Parameter[] => {
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

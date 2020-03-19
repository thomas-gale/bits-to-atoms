import { createSelector } from 'reselect';
import { RootState } from '../index';

import { ServiceProvider } from '../factory/services/types';
import { Identity } from '../common/identity/types';
import { Entity } from '../factory/entity/types';
import { Vector3, Quaternion, Cuboid } from '../common/primitive/types';
import {
  factoryServiceProvidersSelector,
  factoryActiveBuildRequestsSelector
} from '../factory/selectors';
import { BuildRequest } from '../buildrequest/types';
import { Workflow, Activity } from '../workflow/types';

export const selectedSelector = (state: RootState) => state.selected;

export const marketFactoryPanelVisibiltySelector = createSelector(
  [selectedSelector],
  selected => selected.marketFactoryPanelVisibilty
);

export const primaryFocusBuildRequestIdSelector = createSelector(
  [selectedSelector],
  selected => selected.primaryFocusBuildRequestId
);

export const primaryFocusBuildRequestSelector = createSelector(
  [factoryActiveBuildRequestsSelector, primaryFocusBuildRequestIdSelector],
  (
    factoryActiveBuildRequests: BuildRequest[],
    primaryFocusBuildRequestId: Identity | undefined
  ): BuildRequest | undefined => {
    if (!primaryFocusBuildRequestId) return undefined;
    return factoryActiveBuildRequests.find(
      br => br.identity.uuid === primaryFocusBuildRequestId.uuid
    );
  }
);

export const primaryFocusBuildRequestWorkflowSelector = createSelector(
  [primaryFocusBuildRequestSelector],
  (
    primaryFocusBuildRequest: BuildRequest | undefined
  ): Workflow | undefined => {
    if (!primaryFocusBuildRequest) return undefined;
    return primaryFocusBuildRequest.workflow;
  }
);

export const primaryFocusBuildRequestOrderedActivitiesSelector = createSelector(
  [primaryFocusBuildRequestWorkflowSelector],
  (
    primaryFocusBuildRequestWorkflow: Workflow | undefined
  ): Activity[] | undefined => {
    if (!primaryFocusBuildRequestWorkflow) return undefined;
    const orderedActivities: Activity[] = [];
    let currentActivityId = primaryFocusBuildRequestWorkflow.firstActivityId;
    while (currentActivityId) {
      const activityUuid = currentActivityId.uuid;
      const activity = primaryFocusBuildRequestWorkflow.activities.find(
        a => a.identity.uuid === activityUuid
      );
      if (!activity) break;
      orderedActivities.push(activity);
      currentActivityId = activity.nextActivityId;
    }
    return orderedActivities;
  }
);

export const selectedServiceProviderIdSelector = createSelector(
  [selectedSelector],
  selected => selected.selectedServiceProviderId
);

export const selectedServiceProviderSelector = createSelector(
  [factoryServiceProvidersSelector, selectedServiceProviderIdSelector],
  (
    factoryServiceProviders: ServiceProvider[],
    selectedServiceProviderId: Identity | undefined
  ): ServiceProvider | undefined => {
    if (!selectedServiceProviderId) return undefined;
    return factoryServiceProviders.find(
      sp => sp.id.uuid === selectedServiceProviderId.uuid
    );
  }
);

export const selectedServiceProviderEntitySelector = createSelector(
  [selectedServiceProviderSelector],
  (
    selectedServiceProvider: ServiceProvider | undefined
  ): Entity | undefined => {
    if (!selectedServiceProvider) return undefined;
    return selectedServiceProvider as Entity;
  }
);

export const selectedServiceProviderLocationSelector = createSelector(
  [selectedServiceProviderEntitySelector],
  (selectedServiceProviderEntity: Entity | undefined): Vector3 | undefined => {
    if (!selectedServiceProviderEntity) return undefined;
    return selectedServiceProviderEntity.location;
  }
);

export const selectedServiceProviderOrientationSelector = createSelector(
  [selectedServiceProviderEntitySelector],
  (
    selectedServiceProviderEntity: Entity | undefined
  ): Quaternion | undefined => {
    if (!selectedServiceProviderEntity) return undefined;
    return selectedServiceProviderEntity.orientation;
  }
);

export const selectedServiceProviderBoundsSelector = createSelector(
  [selectedServiceProviderEntitySelector],
  (selectedServiceProviderEntity: Entity | undefined): Cuboid | undefined => {
    if (!selectedServiceProviderEntity) return undefined;
    return selectedServiceProviderEntity.bounds;
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

import * as THREE from 'three';
import { createSelector } from 'reselect';
import { Entity } from '../entity/types';
import { selectedServiceProviderEntitySelector } from '../../selected/selectors';
import { CameraTarget } from './types';
import { CreateDefaultCameraTarget } from './factories';

export const selectedEntityCameraTargetSelector = createSelector(
  [selectedServiceProviderEntitySelector],
  (selectedServiceProviderEntity: Entity | undefined): CameraTarget => {
    if (!selectedServiceProviderEntity) return CreateDefaultCameraTarget();

    // First compute camera position (slightly offset from above)
    const cameraPosition = new THREE.Vector3(
      selectedServiceProviderEntity.location.x,
      selectedServiceProviderEntity.location.y - 2,
      5
    );

    // Second compute target, the selected entity
    const cameraLookAt = new THREE.Vector3(
      selectedServiceProviderEntity.location.x,
      selectedServiceProviderEntity.location.y,
      selectedServiceProviderEntity.location.z
    );

    // Finally, the bounds can be an approximate scaled version of the entity bounding box on XY
    const cameraScreenSpaceBounds = new THREE.Box2(
      new THREE.Vector2(
        selectedServiceProviderEntity.bounds.min.x * 2,
        selectedServiceProviderEntity.bounds.min.y * 2
      ),
      new THREE.Vector2(
        selectedServiceProviderEntity.bounds.max.x * 2,
        selectedServiceProviderEntity.bounds.max.y * 2
      )
    );

    return {
      position: cameraPosition,
      lookAt: cameraLookAt,
      screenSpaceBounds: cameraScreenSpaceBounds
    };
  }
);

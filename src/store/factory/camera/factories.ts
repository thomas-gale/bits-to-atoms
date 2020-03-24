import * as THREE from 'three';
import { CameraTarget } from './types';

export function CreateCameraTarget({
  position = new THREE.Vector3(0, 0, 5),
  lookAt = new THREE.Vector3(0, 0, 0),
  screenSpaceBounds = new THREE.Box2(
    new THREE.Vector2(-4, -4),
    new THREE.Vector2(4, 4)
  ),
} = {}): CameraTarget {
  return {
    position,
    lookAt,
    screenSpaceBounds,
  };
}

import * as THREE from 'three';
import { OrthoCameraTarget } from './types';

export function CreateDefaultOrthoCameraTarget(): OrthoCameraTarget {
  return {
    position: new THREE.Vector3(0, 0, 5),
    lookAt: new THREE.Vector3(0, 0, 0),
    screenSpaceBounds: new THREE.Box2(
      new THREE.Vector2(-2, -2),
      new THREE.Vector2(2, 2)
    )
  };
}

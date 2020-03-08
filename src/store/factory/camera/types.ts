import * as THREE from 'three';

export interface CameraTarget {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  screenSpaceBounds: THREE.Box2;
}

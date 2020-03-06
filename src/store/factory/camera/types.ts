import * as THREE from 'three';

export interface OrthoCameraTarget {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
  screenSpaceBounds: THREE.Box2;
}

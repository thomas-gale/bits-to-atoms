export interface Identity {
  uuid: string;
  displayName: string;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}

export interface Cuboid {
  min: Vector3;
  max: Vector3;
}

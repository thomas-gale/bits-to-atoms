export interface LooseObject<T> {
  [key: string]: T;
}

export interface Vector3 extends LooseObject<number> {
  x: number;
  y: number;
  z: number;
}

export interface Quaternion extends LooseObject<number> {
  x: number;
  y: number;
  z: number;
  w: number;
}

export interface Cuboid extends LooseObject<Vector3> {
  min: Vector3;
  max: Vector3;
}

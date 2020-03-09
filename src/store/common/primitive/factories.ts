import { Vector3, Quaternion, Cuboid } from './types';

export function createVector3({ x = 0, y = 0, z = 0 } = {}): Vector3 {
  return {
    x,
    y,
    z
  };
}

export function createQuaternion(x = 0, y = 0, z = 0, w = 1): Quaternion {
  return {
    x,
    y,
    z,
    w
  };
}

export function createCuboid(
  min: Vector3 = createVector3(),
  max: Vector3 = createVector3({ x: 1, y: 1, z: 1 })
): Cuboid {
  return {
    min,
    max
  };
}

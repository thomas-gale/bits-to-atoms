import { Vector3, Quaternion, Cuboid } from './types';
import { createNumberParameter } from '../parameter/factories';

export function createVector3(x = 0, y = 0, z = 0): Vector3 {
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
  max: Vector3 = createVector3(1, 1, 1)
): Cuboid {
  return {
    min,
    max
  };
}

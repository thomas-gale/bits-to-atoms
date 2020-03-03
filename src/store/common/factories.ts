import { v4 as uuidv4 } from 'uuid';
import { Identity, Vector3, Quaternion, Cuboid } from './types';

export function createExistingIdentity(
  displayName: string,
  uuid: string
): Identity {
  return {
    uuid,
    displayName
  };
}

export function createNewIdentity(displayName = 'default'): Identity {
  return {
    uuid: uuidv4(),
    displayName: displayName
  };
}

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

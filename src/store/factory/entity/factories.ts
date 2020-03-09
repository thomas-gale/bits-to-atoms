import { Entity } from './types';
import { createNewIdentity } from '../../common/identity/factories';
import {
  createVector3,
  createQuaternion,
  createCuboid
} from '../../common/primitive/factories';

export function createEntity({
  id = createNewIdentity({ displayName: 'default-entity' }),
  location = createVector3(),
  orientation = createQuaternion(),
  bounds = createCuboid()
} = {}): Entity {
  return {
    id,
    location,
    orientation,
    bounds
  };
}

/*  

 parameters: [
      createNumberParameter(
        createExistingIdentity('Location X', 'locationX'),
        'm',
        location.x
      ),
      createNumberParameter(
        createExistingIdentity('Location Y', 'locationY'),
        'm',
        location.y
      ),
      createNumberParameter(
        createExistingIdentity('Location Z', 'locationZ'),
        'm',
        location.z
      ),
      createNumberParameter(
        createExistingIdentity('Orientation X', 'OrientationX'),
        '',
        orientation.x
      ),
      createNumberParameter(
        createExistingIdentity('Orientation Y', 'OrientationY'),
        '',
        orientation.y
      ),
      createNumberParameter(
        createExistingIdentity('Orientation Z', 'OrientationZ'),
        '',
        orientation.z
      ),
      createNumberParameter(
        createExistingIdentity('Orientation W', 'OrientationW'),
        '',
        orientation.w
      ),
      createNumberParameter(
        createExistingIdentity('Bounds X Min', 'BoundsXMin'),
        'm',
        bounds.min.x
      ),
      createNumberParameter(
        createExistingIdentity('Bounds Y Min', 'BoundsYMin'),
        'm',
        bounds.min.y
      ),
      createNumberParameter(
        createExistingIdentity('Bounds Z Min', 'BoundsZMin'),
        'm',
        bounds.min.z
      ),
      createNumberParameter(
        createExistingIdentity('Bounds X Max', 'BoundsXMax'),
        'm',
        bounds.max.x
      ),
      createNumberParameter(
        createExistingIdentity('Bounds Y Max', 'BoundsYMax'),
        'm',
        bounds.max.y
      ),
      createNumberParameter(
        createExistingIdentity('Bounds Z Max', 'BoundsZMax'),
        'm',
        bounds.max.z
      )
    ]

    */

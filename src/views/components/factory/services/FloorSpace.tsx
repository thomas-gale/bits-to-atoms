import React, { useRef } from 'react';
import { Mesh } from 'three';
import { FloorSpace } from '../../../../store/factory/services/floorspace/types';
import { ServiceProvider } from '../../../../store/factory/services/types';

type OwnProp = {
  floorSpace: FloorSpace;
};

type OwnDispatch = {
  onSelected: (serviceProvider: ServiceProvider) => void;
};

type Props = OwnProp & OwnDispatch;

export function FloorSpaceElement(props: Props): JSX.Element {
  const mesh = useRef<Mesh>();

  const { location, bounds } = props.floorSpace;

  return (
    <mesh
      position={[location.x, location.y, location.z]}
      ref={mesh}
      onClick={e => {
        e.stopPropagation();
        props.onSelected(props.floorSpace);
      }}
    >
      <planeBufferGeometry
        attach="geometry"
        args={[bounds.max.x - bounds.min.x, bounds.max.y - bounds.min.y]}
      />
      <meshStandardMaterial attach="material" color={'grey'} />
    </mesh>
  );
}

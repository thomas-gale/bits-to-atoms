import React, { useRef } from 'react';
import { Mesh } from 'three';
import { FloorSpace } from '../../../../store/factory/services/floorspace/types';
import { Identity } from '../../../../store/common/identity/types';

type OwnProp = {
  floorSpace: FloorSpace;
};

type OwnDispatch = {
  onSelected: (id: Identity) => void;
};

type Props = OwnProp & OwnDispatch;

export function FloorSpaceElement(props: Props): JSX.Element {
  const mesh = useRef<Mesh>();

  const { id, location, bounds } = props.floorSpace;

  return (
    <mesh
      position={[location.x, location.y, location.z]}
      ref={mesh}
      onClick={e => {
        e.stopPropagation();
        props.onSelected(id);
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

import React, { useRef } from 'react';
import { Mesh } from 'three';
import { Identity } from '../../../../store/common/primitive/types';
import { FloorSpace } from '../../../../store/factory/services/floorspace/types';

type OwnDispatch = {
  onSelected: (id: Identity) => void;
};

type Props = FloorSpace & OwnDispatch;

export function FloorSpaceElement(props: Props): JSX.Element {
  const mesh = useRef<Mesh>();

  const { id, location, bounds } = props;

  return (
    <mesh
      position={[location.x, location.y, location.z]}
      ref={mesh}
      onClick={_ => props.onSelected(id)}
    >
      <planeBufferGeometry
        attach="geometry"
        args={[bounds.max.x - bounds.min.x, bounds.max.y - bounds.min.y]}
      />
      <meshStandardMaterial attach="material" color={'grey'} />
    </mesh>
  );
}

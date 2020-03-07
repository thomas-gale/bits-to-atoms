import React, { useRef } from 'react';
import { Mesh, } from 'three';

type OwnProp = {
  largeX: number;
  largeY: number
};

type OwnDispatch = {
  onSelected: () => void;
};

type Props = OwnProp & OwnDispatch;

export function BasePlane(props: Props): JSX.Element {
  const mesh = useRef<Mesh>();

  const { largeX, largeY, onSelected } = props;

  return (
    <mesh
      receiveShadow
      position={[0, 0, -0.1]}
      ref={mesh}
      onClick={e => {
        e.stopPropagation();
        onSelected();
      }}
    >
      <planeBufferGeometry
        attach="geometry"
        args={[largeX, largeY]}
      />
      <meshStandardMaterial attach="material" color={'#44444'} />
    </mesh>
  );
}

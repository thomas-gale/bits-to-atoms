import React, { useRef } from 'react';
import { Mesh, Vector3 } from 'three';

export interface OnPointerMoveArgs {
  point: Vector3;
  ray: {
    origin: Vector3;
    direction: Vector3;
  };
}

type OwnProp = {
  largeX: number;
  largeY: number;
};

type OwnDispatch = {
  onHover: (onPointerMove: OnPointerMoveArgs) => void;
  onSelected: () => void;
};

type Props = OwnProp & OwnDispatch;

export function BasePlane(props: Props): JSX.Element {
  const mesh = useRef<Mesh>();

  const { largeX, largeY, onHover, onSelected } = props;

  return (
    <mesh
      receiveShadow
      position={[0, 0, -0.1]}
      ref={mesh}
      onPointerMove={e => {
        e.stopPropagation();
        onHover(e);
      }}
      onClick={e => {
        e.stopPropagation();
        onSelected();
      }}
    >
      <planeBufferGeometry attach="geometry" args={[largeX, largeY]} />
      <meshStandardMaterial attach="material" color={'lightgrey'} />
    </mesh>
  );
}

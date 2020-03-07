import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Mesh, Euler, Quaternion as ThreeQuaternion, Vector3 } from 'three';
import { HumanWorker } from '../../../../store/factory/services/humanworker/types';
import { Identity } from '../../../../store/common/identity/types';

type OwnProp = {
    gridSize: number;
    position: Vector3
};

type OwnDispatch = {};

type Props = OwnProp & OwnDispatch;

export function GridHoverCursor(props: Props): JSX.Element {
  const { gridSize } = props;
  const { x, y } = props.position;
  const mesh = useRef<Mesh>();

  const [ snappedcursorPostion, setCursorPosition ] = useState(new Vector3(0, 0, 0))
  
  useMemo(() => {
    setCursorPosition(new Vector3(Math.floor(x/gridSize) + gridSize/2, Math.floor(y/gridSize) + gridSize/2, 0));
  }, [x, y]
  )

  return (
    <mesh position={snappedcursorPostion} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 0.2]} />
      <meshBasicMaterial attach="material" color={'royalblue'} />
    </mesh>
  );
}

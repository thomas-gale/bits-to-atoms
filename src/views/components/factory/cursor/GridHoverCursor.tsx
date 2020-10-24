import React, { useRef, useState, useMemo } from 'react';
import { Mesh, Vector3 } from 'three';
import { useSpring, a } from '@react-spring/three';

type OwnProp = {
  gridSize: number;
  position: Vector3;
};

type OwnDispatch = unknown;

type Props = OwnProp & OwnDispatch;

export function GridHoverCursor(props: Props): JSX.Element {
  const { gridSize } = props;
  const { x, y } = props.position;
  const mesh = useRef<Mesh>();

  const [target, setTarget] = useState(new Vector3(0, 0, 0));
  useMemo(() => {
    setTarget(
      new Vector3(
        Math.floor(x / gridSize) + gridSize / 2,
        Math.floor(y / gridSize) + gridSize / 2,
        0
      )
    );
  }, [gridSize, x, y]);

  const { springycursorPostion } = useSpring({
    springycursorPostion: [target.x, target.y, target.z],
  });

  return (
    <a.mesh position={springycursorPostion} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 0.2]} />
      <meshBasicMaterial attach="material" color={'royalblue'} />
    </a.mesh>
  );
}

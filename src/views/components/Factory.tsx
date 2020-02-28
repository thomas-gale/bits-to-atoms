import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Mesh } from 'three';
import FloorSpace from './factory/FloorSpace';
import { ReactReduxContext, Provider } from 'react-redux';

type BoxProps = { position: number[] };

function Box(props: BoxProps): JSX.Element {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh && mesh.current) {
      return (mesh.current.rotation.x = mesh.current.rotation.y += 0.01);
    }
    return 0;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={_ => setActive(!active)}
      onPointerOver={_ => setHover(true)}
      onPointerOut={_ => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? 'hotpink' : 'orange'}
      />
    </mesh>
  );
}

export function Factory() {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Canvas>
          <Provider store={store}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
            <FloorSpace position={[0, 0, 0]} />
          </Provider>
        </Canvas>
      )}
    </ReactReduxContext.Consumer>
  );
}

import React, { useState, useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReactThreeFiber, extend, useThree, useFrame } from 'react-three-fiber';
import { useSpring } from '@react-spring/three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CameraTarget } from '../../../../store/factory/camera/types';

// A few linter disables required to convince React / Typescript to use the OrbitControls.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line no-undef
      orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>;
    }
  }
}

extend({ OrbitControls });

export function SmoothOrbitCamera(props: {
  cameraTarget: CameraTarget | undefined;
}) {
  const { gl, camera } = useThree();
  camera.up.set(0, 0, 1);
  const orbitRef = useRef<OrbitControls>();
  const { cameraTarget } = props;

  const [cameraMoving, setCameraMoving] = useState(false);

  const { springyCameraPos, springyCameraLookAt } = useSpring({
    springyCameraPos: [
      cameraTarget ? cameraTarget.position.x : camera.position.x,
      cameraTarget ? cameraTarget.position.y : camera.position.y,
      cameraTarget ? cameraTarget.position.z : camera.position.z,
    ],
    springyCameraLookAt: [
      cameraTarget
        ? cameraTarget.lookAt.x
        : orbitRef.current
        ? orbitRef.current.target.x
        : 0,
      cameraTarget
        ? cameraTarget.lookAt.y
        : orbitRef.current
        ? orbitRef.current.target.y
        : 0,
      cameraTarget
        ? cameraTarget.lookAt.z
        : orbitRef.current
        ? orbitRef.current.target.z
        : 0,
    ],
    onStart: () => {
      setCameraMoving(true);
    },
    onRest: () => {
      setCameraMoving(false);
    },
  });

  useFrame(() => {
    if (cameraTarget && cameraMoving) {
      const cameraPos = springyCameraPos.getValue();
      const cameraLookAt = springyCameraLookAt.getValue();
      if (cameraPos && cameraLookAt && orbitRef.current) {
        camera.position.set(cameraPos[0], cameraPos[1], cameraPos[2]);
        orbitRef.current.target.set(
          cameraLookAt[0],
          cameraLookAt[1],
          cameraLookAt[2]
        );
        orbitRef.current.update();
      }
    }
  });

  return (
    <orbitControls
      ref={orbitRef}
      args={[camera, gl.domElement]}
      maxPolarAngle={Math.PI / 4}
    />
  );
}

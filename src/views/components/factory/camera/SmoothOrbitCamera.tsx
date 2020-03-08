import React, { useEffect, useState, useRef } from 'react';
import { ReactThreeFiber, extend, useThree, useFrame } from 'react-three-fiber';
import { animated, useSpring } from '@react-spring/three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

export const SmoothOrbitCamera = () => {
  const { gl, camera } = useThree();
  const ref = useRef<OrbitControls>();
  const [dollyFinished, setDollyFinished] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0);

  camera.up.set(0, 0, 1);

  const { z } = useSpring({
    from: { z: 20 },
    z: 10,
    config: {
      mass: 0.1,
      tension: 200,
      friction: 180
    },
    onRest: () => setDollyFinished(true)
  });

  useFrame(() => {
    if (camera.position.z > 10) camera.position.z = z.getValue();
    if (ref.current !== undefined) {
      ref.current.update();
    }
  });

  //  autoRotate autoRotateSpeed={rotationSpeed}  maxAzimuthAngle={Math.PI/2} minAzimuthAngle={-Math.PI}  maxPolarAngle={Math.PI}
  return <orbitControls ref={ref} args={[camera, gl.domElement]}  maxPolarAngle={Math.PI/2} />;
};

/*


  const { springyCameraTarget } = useSpring(
    { springyCameraTarget: cameraTarget, config: { tension: 100 } }
  );


*/

/*

function CameraElement (props: { cameraTarget: OrthoCameraTarget }) {
  const { cameraTarget } = props;
  const { camera } = useThree();

  useEffect(() => {
    const target = cameraTarget;
    camera.position.set(
      target.position.x,
      target.position.y,
      target.position.z
    );
    camera.lookAt(target.lookAt);
    camera.updateProjectionMatrix();
  }, [camera, cameraTarget]);

  return null;
};

*/

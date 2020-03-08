import React, { useEffect, useState, useRef, useMemo } from 'react';
import { ReactThreeFiber, extend, useThree, useFrame } from 'react-three-fiber';
import { animated, useSpring } from '@react-spring/three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CameraTarget } from '../../../../store/factory/camera/types';
import { Object3D, Vector3 } from 'three';

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

export function SmoothOrbitCamera(props: { cameraTarget: CameraTarget, initialCameraTarget: CameraTarget }) {
  const { gl, camera } = useThree();
  const ref = useRef<OrbitControls>();
  const { cameraTarget, initialCameraTarget } = props;
  camera.up.set(0, 0, 1);
  //camera.DefaultUp = new Vector3(0, 0, 1);

  const [cameraMoving, setCameraMoving] = useState(false);

  /*useMemo(() => {
    setCameraMoving(true);
  }, [cameraMoving, initialCameraTarget])*/

  const { springyCameraPos, springyCameraLookAt  } = useSpring({
    springyCameraPos: [ cameraTarget.position.x, cameraTarget.position.y, cameraTarget.position.z ],
    springyCameraLookAt: [ cameraTarget.lookAt.x, cameraTarget.lookAt.y, cameraTarget.lookAt.z ],
    from: {
      springyCameraPos: [ initialCameraTarget.position.x, initialCameraTarget.position.y, initialCameraTarget.position.z ],
      springyCameraLookAt: [ initialCameraTarget.lookAt.x, initialCameraTarget.lookAt.y, initialCameraTarget.lookAt.z ],
    },
    onStart: () => {
      console.log('SmoothOrbitCamera motion started');
      setCameraMoving(true);
    },
    onRest: () => {
      console.log('SmoothOrbitCamera motion complete');
      setCameraMoving(false);
    }
  });

  useFrame(() => {
    if (cameraMoving) {
      const cameraPos = springyCameraPos.getValue();
      const cameraLookAt = springyCameraLookAt.getValue();
      if (cameraPos && cameraLookAt) {
        console.log('camera moving')
        camera.up.set(0,1,0);
        camera.position.set(cameraPos[0], cameraPos[1], cameraPos[2]);
        //camera.updateProjectionMatrix();
        camera.lookAt(cameraLookAt[0], cameraLookAt[1], cameraLookAt[2]);
        //camera.updateProjectionMatrix();
        camera.up.set(0,0,1);
        if (ref.current !== undefined) {
          ref.current.update();
        }
      }
    }
  });

  return (
    <orbitControls
      ref={ref}
      args={[camera, gl.domElement]}
    />
  );
}

/*

// maxPolarAngle={Math.PI / 4}

 //  autoRotate autoRotateSpeed={rotationSpeed}  maxAzimuthAngle={Math.PI/2} minAzimuthAngle={-Math.PI}  maxPolarAngle={Math.PI}


  const { springyCameraTarget } = useSpring(
    { springyCameraTarget: cameraTarget, config: { tension: 100 } }
  );

    /*
  const { z } = useSpring({
    from: { z: 20 },
    z: 10,
    config: {
      mass: 0.1,
      tension: 200,
      friction: 180
    },

  });
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

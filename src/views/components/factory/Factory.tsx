import React, { useEffect, useState, useRef } from 'react';
import { Vector3, Color } from 'three';
import { Canvas, useThree, extend, useFrame, ReactThreeFiber } from 'react-three-fiber';
import { animated, useSpring } from '@react-spring/three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import {
  ReactReduxContext,
  Provider,
  connect,
  ConnectedProps
} from 'react-redux';
import { RootState, RootDispatch } from '../../../store';
import { factoryServiceProvidersSelector } from '../../../store/factory/selectors';
import ServiceProvider from './services/ServiceProvider';
import { selectedEntityCameraTargetSelector } from '../../../store/factory/camera/selectors';
import { OrthoCameraTarget } from '../../../store/factory/camera/types';
import { BasePlane } from './base/BasePlane';
import { unSelect } from '../../../store/selected/slice';
import { GridHoverCursor } from './cursor/GridHoverCursor';


function mapState(state: RootState) {
  return {
    cameraTarget: selectedEntityCameraTargetSelector(state),
    servicesProviders: factoryServiceProvidersSelector(state)
  };
}

function mapDispatch(dispatch: RootDispatch) {
  return {
    onBasePlaneSelected: () => {
      dispatch(unSelect());
    }
  };
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

/*


  const { springyCameraTarget } = useSpring(
    { springyCameraTarget: cameraTarget, config: { tension: 100 } }
  );


*/

extend({ OrbitControls });

declare global {
  namespace JSX {
      interface IntrinsicElements {
        orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>;
      }
  }
}

const Controls = () => {
  const { gl, camera } = useThree()
  const ref = useRef<OrbitControls>()
  const [dollyFinished, setDollyFinished] = useState(false)
  const [rotationSpeed, setRotationSpeed] = useState(0)

  const { z } = useSpring({
    from: { z: 20 },
    z: 10,
    config: {
      mass: 0.1,
      tension: 200,
      friction: 180
    },
    onRest: () => setDollyFinished(true)
  })

  useFrame(() => {
    if (camera.position.z > 10) camera.position.z = z.getValue()
    if (ref.current !== undefined) {
      ref.current.update();
    }
  })

  //  autoRotate autoRotateSpeed={rotationSpeed}  maxAzimuthAngle={Math.PI/2} minAzimuthAngle={-Math.PI}  maxPolarAngle={Math.PI} minPolarAngle={Math.PI/2} 
  return (
  <orbitControls ref={ref} args={[camera, gl.domElement]}/>
  );
}


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

function Factory(props: Props) {
  const { cameraTarget, servicesProviders, onBasePlaneSelected } = props;

  const [cursorPostion, setCursorPosition] = useState(new Vector3(0, 0, 0));

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Canvas shadowMap>
          <Provider store={store}>
            <Controls />
            <CameraElement cameraTarget={cameraTarget} />
            <ambientLight intensity={0.3} />
            <spotLight
              castShadow
              color={new Color(0xffdddd)}
              intensity={0.4}
              angle={Math.PI / 7}
              position={[10, 10, 15]}
              penumbra={2}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight color={new Color(0xddddff)} intensity={0.2} />
            <BasePlane
              largeX={100}
              largeY={100}
              onHover={args => setCursorPosition(args.point)}
              onSelected={onBasePlaneSelected}
            />
            <GridHoverCursor gridSize={1} position={cursorPostion} />
            {servicesProviders.map(servicesProvider => {
              return (
                <ServiceProvider
                  key={servicesProvider.id.uuid}
                  serviceProvider={servicesProvider}
                />
              );
            })}
          </Provider>
        </Canvas>
      )}
    </ReactReduxContext.Consumer>
  );
}

export default connector(Factory);

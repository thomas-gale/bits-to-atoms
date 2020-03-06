import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { Mesh, OrthographicCamera, Camera } from 'three';
import {
  ReactReduxContext,
  Provider,
  connect,
  ConnectedProps
} from 'react-redux';
import { RootState } from '../../../store';
import { factoryServiceProvidersSelector } from '../../../store/factory/selectors';
import ServiceProvider from './services/ServiceProvider';
import { selectedEntityCameraTargetSelector } from '../../../store/factory/camera/selectors';
import { OrthoCameraTarget } from '../../../store/factory/camera/types';

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

function mapState(state: RootState) {
  return {
    cameraTarget: selectedEntityCameraTargetSelector(state),
    servicesProviders: factoryServiceProvidersSelector(state)
  };
}

const connector = connect(mapState);

function initialOrthoCamera(cameraTarget: OrthoCameraTarget ): OrthographicCamera {
  const orthoCamera = new OrthographicCamera(cameraTarget.screenSpaceBounds.min.x, cameraTarget.screenSpaceBounds.max.x, cameraTarget.screenSpaceBounds.min.y, cameraTarget.screenSpaceBounds.max.y);
  orthoCamera.position.set(cameraTarget.position.x, cameraTarget.position.y, cameraTarget.position.z);
  orthoCamera.lookAt(cameraTarget.lookAt);
  orthoCamera.updateProjectionMatrix();
  return orthoCamera;
}

type Props = ConnectedProps<typeof connector>;

function CameraElement(props: { cameraTarget: OrthoCameraTarget }) {
  const { cameraTarget } = props;
  const { camera } = useThree()
  
  useEffect(() => {
    //const orthoCamera = camera as OrthographicCamera;
    camera.position.set(cameraTarget.position.x, cameraTarget.position.y, cameraTarget.position.z);
    camera.lookAt(cameraTarget.lookAt);
    //orthoCamera.left = cameraTarget.screenSpaceBounds.min.x;
    //orthoCamera.right = cameraTarget.screenSpaceBounds.max.x;
    //orthoCamera.bottom = cameraTarget.screenSpaceBounds.max.y;
    //orthoCamera.top = cameraTarget.screenSpaceBounds.min.y;
    camera.updateProjectionMatrix();
  }, [cameraTarget]);

  return null;
}

function Factory(props: Props) {
  const { cameraTarget, servicesProviders } = props;

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Canvas
          //orthographic={true}
        >
          {/* invalidateFrameloop */}
          <Provider store={store}>
            {/* Pass the redux store into the THREE canvas */}
            <CameraElement cameraTarget={cameraTarget}/>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* Test Boxes 
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />*/}
            {/* Render all the ServiceProviders */}
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

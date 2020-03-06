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

type Props = ConnectedProps<typeof connector>;

function Factory(props: Props) {
  const { cameraTarget, servicesProviders } = props;

  //const { camera } = useThree();
  /*
  const orthoCamera = useRef<OrthographicCamera>();
  useEffect(() => {
    if (orthoCamera && orthoCamera.current) {
      orthoCamera.current.position.set(
        cameraTarget.position.x,
        cameraTarget.position.y,
        cameraTarget.position.z
      );
      orthoCamera.current.lookAt(cameraTarget.lookAt);
      orthoCamera.current.left = cameraTarget.screenSpaceBounds.min.x;
      orthoCamera.current.right = cameraTarget.screenSpaceBounds.max.x;
      orthoCamera.current.bottom = cameraTarget.screenSpaceBounds.min.y;
      orthoCamera.current.top = cameraTarget.screenSpaceBounds.max.y;
      orthoCamera.current.updateProjectionMatrix();
    }
  }, [cameraTarget]);*/

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Canvas
          camera={{
            position: cameraTarget.position,
            up: cameraTarget.lookAt,
            left: cameraTarget.screenSpaceBounds.min.x,
            right: cameraTarget.screenSpaceBounds.max.x,
            bottom: cameraTarget.screenSpaceBounds.max.y,
            top: cameraTarget.screenSpaceBounds.min.y
          }}
        >
          {/* invalidateFrameloop */}
          <Provider store={store}>
            {/* Pass the redux store into the THREE canvas */}
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* Test Boxes */}
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
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

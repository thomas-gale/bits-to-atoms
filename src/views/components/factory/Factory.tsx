import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { Mesh, OrthographicCamera, Camera } from 'three';
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

function mapDispatch(dispatch: RootDispatch) {
  return {
    onBasePlaneSelected: () => {
      dispatch(unSelect());
    }
  }
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

function CameraElement(props: { cameraTarget: OrthoCameraTarget }) {
  const { cameraTarget } = props;
  const { camera } = useThree()
  
  useEffect(() => {
    //const orthoCamera = camera as OrthographicCamera;
    camera.position.set(cameraTarget.position.x, cameraTarget.position.y, cameraTarget.position.z);
    camera.lookAt(cameraTarget.lookAt);
    camera.updateProjectionMatrix();
  }, [cameraTarget]);

  return null;
}

function Lights() {
  return (
    <group>
      <pointLight intensity={0.3} />
      <ambientLight intensity={2} />
      <spotLight
        castShadow
        intensity={0.2}
        angle={Math.PI / 7}
        position={[150, 150, 250]}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </group>
  )
}

function Factory(props: Props) {
  const { cameraTarget, servicesProviders, onBasePlaneSelected } = props;

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Canvas shadowMap >
          <Provider store={store}>
            <CameraElement cameraTarget={cameraTarget}/>
            <ambientLight intensity={0.1} />
            <pointLight position={[10, 10, 10]} />
            <spotLight
              castShadow
              intensity={0.2}
              angle={Math.PI / 7}
              position={[15, 15, 15]}
              penumbra={2}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <BasePlane largeX={100} largeY={100} onSelected={onBasePlaneSelected} />
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

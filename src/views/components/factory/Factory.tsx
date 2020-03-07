import React, { useEffect } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import { ACESFilmicToneMapping } from 'three';
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

function CameraElement(props: { cameraTarget: OrthoCameraTarget }) {
  const { cameraTarget } = props;
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(
      cameraTarget.position.x,
      cameraTarget.position.y,
      cameraTarget.position.z
    );
    camera.lookAt(cameraTarget.lookAt);
    camera.updateProjectionMatrix();
  }, [camera, cameraTarget]);

  return null;
}

function SetUpLighting() {
  const { gl } = useThree();
  gl.toneMapping = ACESFilmicToneMapping;
  return null;
}

function Factory(props: Props) {
  const { cameraTarget, servicesProviders, onBasePlaneSelected } = props;

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Canvas shadowMap>
          <Provider store={store}>
            <CameraElement cameraTarget={cameraTarget} />
            <SetUpLighting />
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} />
            <spotLight
              castShadow
              intensity={0.2}
              angle={Math.PI / 7}
              position={[10, 10, 15]}
              penumbra={2}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <BasePlane
              largeX={100}
              largeY={100}
              onSelected={onBasePlaneSelected}
            />
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

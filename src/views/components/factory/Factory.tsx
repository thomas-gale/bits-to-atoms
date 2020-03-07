import React, { useEffect, useState } from 'react';
import { Canvas, useThree, useFrame } from 'react-three-fiber';
import {useSpring, animated} from 'react-spring'

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
import { Vector3, Color } from 'three';

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

function Factory(props: Props) {
  const {
    cameraTarget,
    servicesProviders,
    onBasePlaneSelected
  } = props;

  const [ cursorPostion, setCursorPosition ] = useState(new Vector3(0, 0, 0))

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Canvas shadowMap>
          <Provider store={store}>
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
            <pointLight
              color={new Color(0xddddff)}
              intensity={0.2}
            />
            <BasePlane
              largeX={100}
              largeY={100}
              onHover={(args) => setCursorPosition(args.point)}
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

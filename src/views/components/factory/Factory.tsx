import React, { useState } from 'react';
import { Vector3, Color } from 'three';
import { Canvas } from 'react-three-fiber';

import {
  ReactReduxContext,
  Provider,
  connect,
  ConnectedProps
} from 'react-redux';
import { RootState, RootDispatch } from '../../../store';
import { unSelect } from '../../../store/selected/slice';
import { factoryServiceProvidersSelector } from '../../../store/factory/selectors';
import { selectedEntityCameraTargetSelector } from '../../../store/factory/camera/selectors';

import { SmoothOrbitCamera } from './camera/SmoothOrbitCamera';
import { GridHoverCursor } from './cursor/GridHoverCursor';
import { BasePlane } from './base/BasePlane';
import ServiceProvider from './services/ServiceProvider';

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

function Factory(props: Props) {
  const { cameraTarget, servicesProviders, onBasePlaneSelected } = props;

  const [cursorPostion, setCursorPosition] = useState(new Vector3(0, 0, 0));

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Canvas shadowMap>
          <Provider store={store}>
            <SmoothOrbitCamera cameraTarget={cameraTarget} />
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

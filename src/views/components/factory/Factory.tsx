import React, { useState } from 'react';
import { Vector3 } from 'three';
import { Canvas } from 'react-three-fiber';

import {
  ReactReduxContext,
  Provider,
  connect,
  ConnectedProps
} from 'react-redux';
import { RootState, RootDispatch } from '../../../store';
import { unSelect } from '../../../store/selected/slice';
import {
  factoryServiceProvidersSelector,
  factoryInputRegionSelector,
  factoryOutputRegionSelector
} from '../../../store/factory/selectors';
import { selectedEntityCameraTargetSelector } from '../../../store/factory/camera/selectors';

import { SmoothOrbitCamera } from './camera/SmoothOrbitCamera';
import { GridHoverCursor } from './cursor/GridHoverCursor';
import { Lighting } from './base/Lighting';
import { BasePlane } from './base/BasePlane';
import { InputRegionElement } from './boundaries/InputRegion';
import { OutputRegionElement } from './boundaries/OutputRegion';
import ServiceProvider from './services/ServiceProvider';

function mapState(state: RootState) {
  return {
    cameraTarget: selectedEntityCameraTargetSelector(state),
    inputRegion: factoryInputRegionSelector(state),
    outputRegion: factoryOutputRegionSelector(state),
    servicesProviders: factoryServiceProvidersSelector(state)
  };
}

function mapDispatch(dispatch: RootDispatch) {
  return {
    onBasePlaneSelected: () => {
      dispatch(unSelect());
    },
    onInputRegionSelected: () => {
      console.log('Input region selected');
    },
    onOutputRegionSelected: () => {
      console.log('Output region selected');
    }
  };
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

function Factory(props: Props) {
  const {
    cameraTarget,
    inputRegion,
    outputRegion,
    servicesProviders,
    onBasePlaneSelected,
    onInputRegionSelected,
    onOutputRegionSelected
  } = props;

  const [cursorPostion, setCursorPosition] = useState(new Vector3(0, 0, 0));

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Canvas shadowMap>
          <Provider store={store}>
            <SmoothOrbitCamera cameraTarget={cameraTarget} />
            <Lighting />
            <BasePlane
              largeX={100}
              largeY={100}
              onHover={args => setCursorPosition(args.point)}
              onSelected={onBasePlaneSelected}
            />
            <GridHoverCursor gridSize={1} position={cursorPostion} />
            <InputRegionElement
              inputRegion={inputRegion}
              onSelected={onInputRegionSelected}
            />
            <OutputRegionElement
              outputRegion={outputRegion}
              onSelected={onOutputRegionSelected}
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

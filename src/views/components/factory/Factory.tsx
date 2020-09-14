import React, { useState, useCallback, useEffect } from 'react';
import { Vector3 } from 'three';
import { Canvas } from 'react-three-fiber';

import {
  ReactReduxContext,
  Provider,
  connect,
  ConnectedProps,
} from 'react-redux';
import { RootState, RootDispatch } from '../../../store';
import { unSelectServiceProvider } from '../../../store/selected/slice';
import { factoryServiceProvidersSelector } from '../../../store/factory/selectors';
import { selectedEntityCameraTargetSelector } from '../../../store/factory/camera/selectors';

import { SmoothOrbitCamera } from './camera/SmoothOrbitCamera';
import { GridHoverCursor } from './cursor/GridHoverCursor';
import { Lighting } from './base/Lighting';
import { BasePlane } from './base/BasePlane';
import ServiceProvider from './services/ServiceProvider';
import useIpfsFactory from '../../../store/ipfs/use-ipfs-factory';

function mapState(state: RootState) {
  return {
    cameraTarget: selectedEntityCameraTargetSelector(state),
    servicesProviders: factoryServiceProvidersSelector(state),
  };
}

function mapDispatch(dispatch: RootDispatch) {
  return {
    onBasePlaneSelected: () => {
      dispatch(unSelectServiceProvider());
    },
    onInputRegionSelected: () => {
      console.log('Input region selected');
    },
    onOutputRegionSelected: () => {
      console.log('Output region selected');
    },
  };
}

export const IpfsContext = React.createContext(undefined);

const connector = connect(mapState, mapDispatch);
type Props = ConnectedProps<typeof connector>;

function Factory(props: Props) {
  const [ipfscontextvalue, setConextValueIpfs] = useState<undefined | any>(
    undefined
  );
  const { ipfs } = useIpfsFactory();
  useEffect(() => {
    setConextValueIpfs(ipfs);
  }, [ipfs]);

  //const getIpfsContextValue = useCallback(() => )

  const { cameraTarget, servicesProviders, onBasePlaneSelected } = props;
  const [cursorPostion, setCursorPosition] = useState(new Vector3(0, 0, 0));

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Canvas shadowMap>
          <Provider store={store}>
            <IpfsContext.Provider value={ipfscontextvalue}>
              <SmoothOrbitCamera cameraTarget={cameraTarget} />
              <Lighting />
              <BasePlane
                largeX={100}
                largeY={100}
                onHover={(args) => setCursorPosition(args.point)}
                onSelected={onBasePlaneSelected}
              />
              <GridHoverCursor gridSize={1} position={cursorPostion} />
              {servicesProviders.map((servicesProvider) => {
                return (
                  <ServiceProvider
                    key={servicesProvider.id}
                    serviceProvider={servicesProvider}
                  />
                );
              })}
            </IpfsContext.Provider>
          </Provider>
        </Canvas>
      )}
    </ReactReduxContext.Consumer>
  );
}

export default connector(Factory);

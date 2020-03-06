import React, { useRef, useState, Component } from 'react';
import { Scene, Engine, withBabylonJS } from 'react-babylonjs';
import { Vector3 } from '@babylonjs/core';
//import { Canvas, useFrame } from 'react-three-fiber';
//import { Mesh } from 'three';
import {
  ReactReduxContext,
  Provider,
  connect,
  ConnectedProps
} from 'react-redux';
import { RootState } from '../../../store';
import { factoryServiceProvidersSelector } from '../../../store/factory/selectors';
//import ServiceProvider from './services/ServiceProvider';

const EngineWithContext = withBabylonJS(Engine);

function mapState(state: RootState) {
  return {
    servicesProviders: factoryServiceProvidersSelector(state)
  };
}

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

const Factory: React.FC = () => {
  //const { servicesProviders } = props;
  return (
    <EngineWithContext antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
      <Scene>
        <freeCamera name="camera1" position={new Vector3(0, 5, -10)}/>
        <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
        <sphere name="sphere1" diameter={2} segments={16} position={new Vector3(0, 1, 0)} />
        <ground name="ground1" width={6} height={6} subdivisions={2}  />
      </Scene>
    </EngineWithContext>
  );
}

export default Factory;

//export default connector(Factory);

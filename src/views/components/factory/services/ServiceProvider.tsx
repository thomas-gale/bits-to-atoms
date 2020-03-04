import React, { useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Mesh } from 'three';
import { RootState, AppDispatch } from '../../../../store';
import {
  ServiceProvider,
  ServiceType
} from '../../../../store/factory/services/types';
import { Identity } from '../../../../store/common/primitive/types';
import { FloorSpaceElement } from './FloorSpace';
import { FloorSpace } from '../../../../store/factory/services/floorspace/types';

function mapState(_: RootState) {
  return {};
}

function mapDispatch(_: AppDispatch) {
  return {
    onSelected: (id: Identity) => {
      console.log(`Service provider: ${id.displayName} selected`);
    }
  };
}
type OwnProps = {
  serviceProvider: ServiceProvider;
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & OwnProps;

function ServiceProviderElement(props: Props): JSX.Element {
  const mesh = useRef<Mesh>();

  // Pull out properties
  const { serviceProvider } = props;
  const { id, location, bounds } = serviceProvider;

  // Render generic things about service provider
  //  - Invisible bounding box at a location / Orientation
  //  - Proxy for the mesh?

  switch (serviceProvider.type) {
    case ServiceType.Floorspace:
      return (
        <FloorSpaceElement floorSpace={serviceProvider as FloorSpace} onSelected={props.onSelected} />
      );
    case ServiceType.HumanWorker:
      return (
        <mesh
          position={[location.x, location.y, location.z]}
          ref={mesh}
          onClick={_ => props.onSelected(id)}
        >
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={'pink'} />
        </mesh>
      );
    default:
      return (
        <mesh
          position={[location.x, location.y, location.z]}
          ref={mesh}
          onClick={_ => props.onSelected(id)}
        >
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color={'red'} />
        </mesh>
      );
  }
}

export default connector(ServiceProviderElement);

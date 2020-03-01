import React, { useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Mesh } from 'three';
import { RootState } from '../../../../store';
import { floorSpaceSelector } from '../../../../store/factory/services/floorspace/selectors';

function mapState(state: RootState) {
  return {
    floorSpace: floorSpaceSelector(state)
  };
}

type OwnProps = {
  position: number[];
};

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector> & OwnProps;

function FloorSpace(props: Props): JSX.Element {
  const mesh = useRef<Mesh>();

  const { position, floorSpace } = props;

  return (
    <mesh position={position} ref={mesh}>
      <planeBufferGeometry
        attach="geometry"
        args={[floorSpace.xLength, floorSpace.yLength]}
      />
      <meshStandardMaterial attach="material" color={'grey'} />
    </mesh>
  );
}

export default connector(FloorSpace);

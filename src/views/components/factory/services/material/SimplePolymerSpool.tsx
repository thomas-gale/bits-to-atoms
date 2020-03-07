import React, { useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Mesh } from 'three';
import { RootState } from '../../../../../store';

function mapState(_: RootState) {
  return {
    //floorSpace: floorSpaceSelector(state)
  };
}

type OwnProps = {
  position: number[];
};

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector> & OwnProps;

function FloorSpace(props: Props): JSX.Element {
  const mesh = useRef<Mesh>();

  const { position } = props;

  return (
    <mesh position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={'black'} />
    </mesh>
  );
}

export default connector(FloorSpace);

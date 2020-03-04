import React, { useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Mesh } from 'three';
import { RootState } from '../../../../store';
import { floorSpaceSelector } from '../../../../store/factory/services/floorspace/selectors';

function mapState(state: RootState) {
  return {};
}

type OwnProps = {
  position: number[];
};

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector> & OwnProps;

function HumanWorker(props: Props): JSX.Element {
  const mesh = useRef<Mesh>();

  const { position } = props;

  return (
    <mesh position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={'pink'} />
    </mesh>
  );
}

export default connector(HumanWorker);

import React, { useRef } from 'react';
import { Mesh } from 'three';
import { HumanWorker } from '../../../../store/factory/services/humanworker/types';
import { Identity } from '../../../../store/common/primitive/types';

type OwnProp = {
  humanWorker: HumanWorker;
};

type OwnDispatch = {
  onSelected: (id: Identity) => void;
};

type Props = OwnProp & OwnDispatch;

export function HumanWorkerElement(props: Props): JSX.Element {
  const mesh = useRef<Mesh>();

  const { id, location, bounds } = props.humanWorker;

  return (
    <mesh
      position={[location.x, location.y, location.z]}
      ref={mesh}
      onClick={_ => props.onSelected(id)}
    >
      <boxBufferGeometry
        attach="geometry"
        args={[
          bounds.max.x - bounds.min.x,
          bounds.max.y - bounds.min.y,
          bounds.max.z - bounds.min.z
        ]}
      />
      <meshStandardMaterial attach="material" color={'pink'} />
    </mesh>
  );
}

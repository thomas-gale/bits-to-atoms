import React, { useRef, useState, useEffect } from 'react';
import { Mesh, Euler, Quaternion as ThreeQuaternion } from 'three';
import { HumanWorker } from '../../../../store/factory/services/humanworker/types';
import { Identity } from '../../../../store/common/identity/types';

type OwnProp = {
  humanWorker: HumanWorker;
};

type OwnDispatch = {
  onSelected: (id: Identity) => void;
};

type Props = OwnProp & OwnDispatch;

export function HumanWorkerElement(props: Props): JSX.Element {
  const mesh = useRef<Mesh>();

  const { id, location, orientation, bounds } = props.humanWorker;

  // React hooks for converting the Quaterion into Euler angles.
  const [eulerRotation, setEulerRotation] = useState<Euler>(new Euler(0,0,0)); 
  useEffect(() => {
    const newEuler = new Euler(0,0,0);
    newEuler.setFromQuaternion(
      new ThreeQuaternion(
        orientation.x,
        orientation.y,
        orientation.z,
        orientation.w
      ));
      setEulerRotation(newEuler);
        
  }, [orientation]
  )

  return (
    <mesh
      position={[location.x, location.y, location.z]}
      rotation={eulerRotation}
      ref={mesh}
      onClick={e => {
        e.stopPropagation();
        props.onSelected(id);
      }}
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

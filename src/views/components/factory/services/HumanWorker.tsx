import React, { useState, useMemo, Suspense } from 'react';
import { Euler, Quaternion as ThreeQuaternion } from 'three';
import HumanModel from './models/Human.gltf';
import { HumanWorker } from '../../../../store/factory/services/humanworker/types';

type OwnProp = {
  humanWorker: HumanWorker;
};

type OwnDispatch = {
  onSelected: (id: string) => void;
};

type Props = OwnProp & OwnDispatch;

export function HumanWorkerElement(props: Props): JSX.Element {
  const { id, location, orientation } = props.humanWorker;

  // React hooks for converting the Quaterion into Euler angles.
  const [eulerRotation, setEulerRotation] = useState<Euler>(new Euler(0, 0, 0));
  useMemo(() => {
    const newEuler = new Euler(0, 0, 0);
    newEuler.setFromQuaternion(
      new ThreeQuaternion(
        orientation.x,
        orientation.y,
        orientation.z,
        orientation.w
      )
    );
    setEulerRotation(newEuler);
  }, [orientation]);

  return (
    <Suspense fallback={null}>
      <HumanModel
        position={[location.x, location.y, location.z]}
        rotation={eulerRotation}
        onClick={(e) => {
          e.stopPropagation();
          props.onSelected(id);
        }}
      />
    </Suspense>
  );
}

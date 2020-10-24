import React, { useMemo, useState, Suspense } from 'react';
import { Euler, Quaternion as ThreeQuaternion } from 'three';
import FFFPrinterModel from './models/FFFPrinter.gltf';
import { FFFPrinter } from '../../../../store/factory/services/fffprinter/types';

type OwnProp = {
  fffPrinter: FFFPrinter;
};

type OwnDispatch = {
  onSelected: (id: string) => void;
};

type Props = OwnProp & OwnDispatch;

export function FFFPrinterElement(props: Props): JSX.Element {
  const { id, location, orientation } = props.fffPrinter;

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
      <FFFPrinterModel
        position={[location.x, location.y, location.z]}
        rotation={eulerRotation}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(e: any) => {
          e.stopPropagation();
          props.onSelected(id);
        }}
      />
    </Suspense>
  );
}

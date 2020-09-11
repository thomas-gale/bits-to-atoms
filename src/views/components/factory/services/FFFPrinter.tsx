import React, { useMemo, useState, Suspense, useEffect, useRef } from 'react';
import { Euler, Quaternion as ThreeQuaternion, Mesh } from 'three';
import FFFPrinterModel from './models/FFFPrinter.gltf';
import { FFFPrinter } from '../../../../store/factory/services/fffprinter/types';
import useIpfsFactory from '../../../../store/ipfs/use-ipfs-factory';

type OwnProp = {
  fffPrinter: FFFPrinter;
};

type OwnDispatch = {
  onSelected: (id: string) => void;
};

type Props = OwnProp & OwnDispatch;

export function FFFPrinterElement(props: Props): JSX.Element {
  const mesh = useRef<Mesh>();
  const { id, location, orientation, bounds } = props.fffPrinter;

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

  // Experimental file loading from ipfs
  const { ipfs } = useIpfsFactory();

  //const ipfsId = useIpfs(ipfs, 'id', null);
  const [model, setModel] = useState<any | undefined>(undefined);

  const modelCID = 'QmbdSeJfWsUm5ghb9pp98qwnbTbzKN8BvtarJhRTmTxhCw';

  useEffect(() => {
    const downloadModel = async () => {
      const chunks = [];
      for await (const chunk of ipfs.cat(modelCID)) {
        chunks.push(chunk);
        console.log('Got model chunk...');
      }
      console.log('All chunks downloaded! length: ' + chunks.length);
      setModel(chunks);
    };
    if (ipfs) downloadModel();
  }, [ipfs]);

  if (model) {
    return (
      <Suspense fallback={null}>
        <FFFPrinterModel
          model={model}
          position={[location.x, location.y, location.z]}
          rotation={eulerRotation}
          onClick={(e: any) => {
            e.stopPropagation();
            props.onSelected(id);
          }}
        />
      </Suspense>
    );
  } else {
    return (
      <mesh
        castShadow
        receiveShadow
        position={[location.x, location.y, location.z]}
        rotation={eulerRotation}
        ref={mesh}
        onClick={(e) => {
          e.stopPropagation();
          props.onSelected(id);
        }}
      >
        <boxBufferGeometry
          attach="geometry"
          args={[
            bounds.max.x - bounds.min.x,
            bounds.max.y - bounds.min.y,
            bounds.max.z - bounds.min.z,
          ]}
        />
        <meshStandardMaterial attach="material" color={'grey'} />
      </mesh>
    );
  }
}

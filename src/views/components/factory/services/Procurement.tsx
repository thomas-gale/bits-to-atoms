import React, { useRef, useState, useMemo } from 'react';
import { Mesh, Euler, Quaternion as ThreeQuaternion } from 'three';
import { ProcurementService } from '../../../../store/factory/services/procurementservice/types';

type OwnProp = {
  procurementService: ProcurementService;
};

type OwnDispatch = {
  onSelected: (id: string) => void;
};

type Props = OwnProp & OwnDispatch;

export function ProcurementElement(props: Props): JSX.Element {
  const mesh = useRef<Mesh>();

  const { id, location, orientation, bounds } = props.procurementService;

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

  // Some logic for nicely rendering a collection of fixed assets in (e.g material etc.)
  //const [assetInOffset, setAssetsInOffset] = useState<number>(0);

  return (
    <group>
      {/*assetsIn.map(asset => {
        switch (asset.type) {
          case FixedAssetType.SimplePolymerSpool:
            return (
              <SimplePolymerSpool
                key={asset.id.uuid}
                position={[
                  asset.location.x,
                  asset.location.y,
                  asset.location.z
                ]}
              />
            );
          default:
            return null;
        }
      })*/}
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
    </group>
  );
}

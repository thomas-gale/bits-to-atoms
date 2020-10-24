/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from 'react';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { IpfsContext } from './IpfsContext';

// Taken from https://github.com/react-spring/react-three-fiber/blob/fec915980278ba041b458d9dffb26a7747ec7bce/src/hooks.ts
const blackList = [
  'id',
  'uuid',
  'type',
  'children',
  'parent',
  'matrix',
  'matrixWorld',
  'matrixWorldNeedsUpdate',
  'modelViewMatrix',
  'normalMatrix',
];

// Taken from https://github.com/react-spring/react-three-fiber/blob/fec915980278ba041b458d9dffb26a7747ec7bce/src/hooks.ts
function prune(props: any) {
  const reducedProps = { ...props };
  // Remove black listed props
  blackList.forEach((name) => delete reducedProps[name]);
  // Remove functions
  Object.keys(reducedProps).forEach(
    (name) =>
      typeof reducedProps[name] === 'function' && delete reducedProps[name]
  );
  // Prune materials and geometries
  if (reducedProps.material)
    reducedProps.material = prune(reducedProps.material);
  if (reducedProps.geometry)
    reducedProps.geometry = prune(reducedProps.geometry);
  // Return cleansed object
  return reducedProps;
}

type BaseGLTFResult = GLTF & {
  nodes: any; // This depends on gltfjsx generator
  materials: any; // ditto ^^
};

// Meta hook for setting up Ipfs, downloading model by content Id, and parsing into the generic result type.
export const useIpfsGltfLoader = <T extends BaseGLTFResult>(
  modelCID: string
): T | undefined => {
  // Experimental file loading from ipfs
  const ipfs = useContext(IpfsContext);

  // Downloaded model chunks.
  const [model, setModel] = useState<any | undefined>(undefined);

  useEffect(() => {
    // This won't run untill ipfs is defined.
    const downloadModel = async (ipfs: any) => {
      const chunks = [];
      for await (const chunk of ipfs.cat(modelCID)) {
        chunks.push(chunk);
        console.log('Got model chunk...');
      }
      console.log('All chunks downloaded! length: ' + chunks.length);
      setModel(chunks);
    };
    if (ipfs) downloadModel(ipfs);
  }, [ipfs, modelCID]);

  // New From Model Data
  const [result, setResult] = useState<T>();

  useEffect(() => {
    // This won't run until the model is defined.
    if (!model) return;
    const loadGLTF = async () => {
      const loader = new GLTFLoader();

      // This has to be deprecated at some point!
      // Taken from  https://github.com/react-spring/react-three-fiber/blob/fec915980278ba041b458d9dffb26a7747ec7bce/src/hooks.ts

      // We are just assuming a single chunk
      loader.parse(model[0], '', (gltf: GLTF) => {
        // Temp array for traversal.
        const temp = [];

        // Nodes and materials are better
        let nodes: any = {};
        const materials: any = {};
        gltf.scene.traverse((obj: any) => {
          temp.push(prune(obj));
          if (obj.name) nodes = { ...nodes, [obj.name]: obj };
          if (obj.material && !materials[obj.material.name])
            materials[obj.material.name] = obj.material;
        });

        // Pass data out.
        setResult({
          ...gltf,
          nodes: nodes,
          materials: materials,
        } as T);
      });
    };
    loadGLTF();
  }, [model]);

  return result;
};

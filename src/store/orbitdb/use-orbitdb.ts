import { useState } from 'react';
import OrbitDb from 'orbit-db';

export const useOrbitDb = (ipfs: any): any => {
  // Preconditions
  //const ipfs = useContext(IpfsContext);

  const [orbitDb, setOrbitDb] = useState<undefined | any>(undefined);

  const createInstance = async () => {
    if (ipfs) {
      setOrbitDb(await OrbitDb.createInstance(ipfs));
    }
  };
  createInstance();

  return orbitDb;
};

export const useOrbitKeyValueDb = (orbitDb: any, name: string): any => {
  // Preconditions
  //const orbitDb = useContext(OrbitDbContext);

  const [kvDb, setKvDb] = useState<undefined | any>(undefined);

  const loadDb = async () => {
    if (orbitDb) {
      setKvDb(await orbitDb.keyvalue(name));
    }
  };
  loadDb();

  return kvDb;
};

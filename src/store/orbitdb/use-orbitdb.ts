import { useState, useContext } from 'react';
import OrbitDb from 'orbit-db';
import { IpfsContext } from '../ipfs/IpfsContext';
import { OrbitDbContext } from './OrbitDbContext';

export const useOrbitDb = (): any => {
  // Preconditions
  const ipfs = useContext(IpfsContext);
  if (ipfs === undefined) return undefined;

  const [orbitDb, setOrbitDb] = useState(undefined);

  const createInstance = async () => {
    setOrbitDb(await OrbitDb.createInstance(ipfs));
  };
  createInstance();

  return orbitDb;
};

export const createOrbitKeyValueDb = (name: string): any => {
  // Preconditions
  const orbitDb = useContext(OrbitDbContext);
  if (orbitDb === undefined) return undefined;

  const [kvDb, setKvDb] = useState(undefined);

  const loadDb = async () => {
    setKvDb(await orbitDb.keyvalue(name));
  };
  loadDb();

  return kvDb;
};

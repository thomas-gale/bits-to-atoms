import { Client, Identity, KeyInfo, ThreadID } from '@textile/hub';
import { config } from '../../env/config';
import { Textile } from './types';

export const createInsecureKey = (): KeyInfo => {
  return {
    key: config.textile.insecureKey,
  };
};

export const createThreadID = (): ThreadID => {
  return ThreadID.fromString(config.textile.threadId);
};

export const createTextile = ({
  isHost = undefined as undefined | boolean,
  detailsVisible = false,
  identity = undefined as undefined | Identity,
  token = '',
  client = undefined as undefined | Client,
  thread = undefined as undefined | ThreadID,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collections = undefined as undefined | any,
} = {}): Textile => {
  return {
    isHost,
    detailsVisible,
    identity,
    token,
    client,
    thread,
    collections,
  };
};

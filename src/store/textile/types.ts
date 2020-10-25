import { Client, Identity, ThreadID } from '@textile/hub';

export interface Collection {
  name: string;
  schema: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  indexesList: any[];
  writevalidator: string;
  readfilter: string;
}

export interface Textile {
  detailsVisible: boolean;
  identity: undefined | Identity;
  token: string;
  client: undefined | Client;
  thread: undefined | ThreadID;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collections: undefined | Collection[];
}

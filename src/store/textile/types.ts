import { Client, Identity, ThreadID } from '@textile/hub';

export interface Textile {
  detailsVisible: boolean;
  identity: undefined | Identity;
  token: string;
  client: undefined | Client;
  thread: undefined | ThreadID;
}

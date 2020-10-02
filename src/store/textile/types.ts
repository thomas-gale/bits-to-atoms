import { PrivateKey } from '@textile/hub';

export interface User {
  privateKey: PrivateKey;
}

export interface Textile {
  user: undefined | User;
}

import { Identity } from '@textile/hub';

export interface User {
  identity: Identity;
}

export interface Textile {
  detailsVisible: boolean;
  user: undefined | User;
  token: string;
}

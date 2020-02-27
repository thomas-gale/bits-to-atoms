import { Identity } from '../common/types';

export enum PartType {
  CUBE
}

export interface BuildRequest {
  identity: Identity;
  type: PartType;
  size: number;
}

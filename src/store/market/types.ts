import { Identity } from '../common/identity/types';
import { Material } from '../common/material/types';

export enum PartType {
  CUBE
}

export interface BuildRequest {
  identity: Identity;
  material: Material;
  type: PartType;
  size: number;
}

export interface Market {
  visible: boolean;
  buildRequests: BuildRequest[];
}

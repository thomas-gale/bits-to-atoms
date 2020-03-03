import { Identity } from '../common/primitive/types';
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

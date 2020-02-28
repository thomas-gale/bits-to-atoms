import { Identity } from '../common/types';

export interface Factory {
  id: Identity;
  floorSpace: FloorSpace;
}

export interface FloorSpace {
  id: Identity;
  xLength: number;
  yLength: number;
}

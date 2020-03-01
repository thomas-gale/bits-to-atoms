import { Identity } from '../common/types';

export interface Factory {
  id: Identity;
  floorSpace: {
    id: Identity;
  } & FloorSpace;
}

export interface FloorSpace {
  xLength: number;
  yLength: number;
}

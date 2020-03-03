import { Identity } from '../primitive/types';
import { Entity } from '../../factory/types';

export enum MaterialType {
  SimplePolymer = 'SimplePolymer'
}

export interface SimplePolymer {
  id: Identity;
}

export interface SimplePolymerSpool extends SimplePolymer, Entity {
  spoolLength: number;
  spoolDiameter: number;
}

export type Material = SimplePolymer;

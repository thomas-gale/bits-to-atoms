import { Identity } from '../../common/types';
import { Entity } from '../types';

export enum MaterialType {
  SimplePolymer = 'SimplePolymer'
}

export interface SimplePolymer extends Identity {
  type: MaterialType;
  costPerKilo: number;
}

export interface SimplePolymerSpool extends SimplePolymer, Entity {
  spoolLength: number;
  spoolDiameter: number;
}

export type Material = SimplePolymer;

import { Identity } from '../identity/types';
import { NumberParameter } from '../parameter/types';
import { Entity } from '../../factory/types';

export enum MaterialType {
  SimplePolymer = 'SimplePolymer'
}

export interface SimplePolymer {
  id: Identity;
}

export interface SimplePolymerSpool extends SimplePolymer, Entity {
  spoolLength: NumberParameter;
  spoolDiameter: NumberParameter;
}

export type Material = SimplePolymer;

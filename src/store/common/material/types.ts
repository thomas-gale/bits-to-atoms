import { Identity } from '../identity/types';
import { NumberParameter } from '../parameter/types';
import { Entity } from '../../factory/entity/types';

export enum MaterialType {
  SimplePolymer
}

export interface SimplePolymer {
  id: Identity;
}

export interface SimplePolymerSpool
  extends SimplePolymer,
    Entity<NumberParameter> {
  spoolLength: NumberParameter;
  spoolDiameter: NumberParameter;
}

export type Material = SimplePolymer;

import { Identity } from '../../../common/identity/types';
import { NumberParameter } from '../../../common/parameter/types';
import { Entity } from '../../entity/types';

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

import { Identity } from '../../common/types';
import { Entity } from '../types';

export type Material = Identity;

export interface SimplePolymer extends Material {
  costPerKilo: number;
}

export interface SpoolPolymerMaterial extends SimplePolymer, Entity {
  spoolLength: number;
  spoolDiameter: number;
}

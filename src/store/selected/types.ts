import { Identity } from '../common/types';

export enum ParameterType {
  STRING,
  NUMBER
}

export interface Parameter {
  identity: Identity;
  type: ParameterType;
  value: string;
}

export interface Selected {
  identity: Identity;
  parameters: Parameter[];
}

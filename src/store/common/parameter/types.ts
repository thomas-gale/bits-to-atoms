import { Identity } from '../identity/types';

export enum ParameterType {
  String,
  Number
}

interface ParameterBase {
  identity: Identity;
  type: ParameterType;
  units: string;
}

export interface NumberParameter extends ParameterBase {
  value: number;
}

export interface StringParameter extends ParameterBase {
  value: string;
}

export type Parameter = NumberParameter | StringParameter;

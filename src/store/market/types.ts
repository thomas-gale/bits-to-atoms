export enum PartType {
  CUBE
}

export interface BuildRequest {
  id: string;
  name: string;
  type: PartType;
  size: number;
}

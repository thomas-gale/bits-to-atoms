import { Identity } from '../common/identity/types';
import { ServiceProvider } from './services/types';
import { Parameter } from '../common/parameter/types';

export interface Entity {
  id: Identity;
  parameter: Parameter[];
}

export interface Factory extends Entity {
  serviceProviders: ServiceProvider[];
}

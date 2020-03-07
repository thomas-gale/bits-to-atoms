import { Identity } from '../common/identity/types';
import { Vector3 } from '../common/primitive/types';
import { ServiceProvider } from './services/types';

export interface Factory {
  identity: Identity;
  serviceProviders: ServiceProvider[];
}

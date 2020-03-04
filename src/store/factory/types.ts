import { Identity } from '../common/identity/types';
import { ServiceProvider } from './services/types';

export interface Factory {
  identity: Identity;
  serviceProviders: ServiceProvider[];
}

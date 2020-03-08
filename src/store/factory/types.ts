import { Identity } from '../common/identity/types';
import { Asset } from '../economic/types';
import { ServiceProvider } from './services/types';

export interface Factory {
  identity: Identity;
  assets: Asset[];
  serviceProviders: ServiceProvider[];
}

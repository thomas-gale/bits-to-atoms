import { Identity } from '../common/identity/types';
import { OutputRegion, InputRegion } from './boundaries/types';
import { Asset } from '../economic/types';
import { ServiceProvider } from './services/types';

export interface Factory {
  identity: Identity;
  inputRegion: InputRegion;
  outputRegion: OutputRegion;
  assets: Asset[];
  serviceProviders: ServiceProvider[];
}

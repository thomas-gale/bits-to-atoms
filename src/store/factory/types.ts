import { Identity } from '../common/identity/types';
import { BuildRequest } from '../buildrequest/types';
import { OutputRegion, InputRegion } from './boundaries/types';
import { LiquidAsset, FixedAsset } from '../economic/types';
import { ServiceProvider } from './services/types';

// TD: This data could do with a spot of Normalizr https://github.com/paularmstrong/normalizr
export interface Factory {
  identity: Identity;
  inputRegion: InputRegion;
  outputRegion: OutputRegion;
  liquidAsset: LiquidAsset;
  fixedAssets: FixedAsset[];
  activeBuildRequests: BuildRequest[];
  //openActivities: Identity[];
  serviceProviders: ServiceProvider[];
}

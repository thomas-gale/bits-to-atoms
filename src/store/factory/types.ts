import { Identity } from '../common/identity/types';
import { BuildRequest } from '../buildrequest/types';
import { LiquidAsset, FixedAsset } from '../economic/types';
import { ServiceProvider } from './services/types';

// TD: This data could do with a spot of Normalizr https://github.com/paularmstrong/normalizr
export interface Factory extends Identity {
  liquidAsset: LiquidAsset;
  fixedAssets: FixedAsset[];
  buildRequests: BuildRequest[];
  serviceProviders: ServiceProvider[];
}

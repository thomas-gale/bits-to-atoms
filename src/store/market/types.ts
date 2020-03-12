import { BuildRequest } from '../buildrequest/types';

export interface Market {
  visible: boolean;
  buildRequests: BuildRequest[];
}

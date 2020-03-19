import { ServiceType, TransmutationServiceProvider } from '../types';

export interface DispatchService extends TransmutationServiceProvider {
  type: ServiceType.Dispatch;
}

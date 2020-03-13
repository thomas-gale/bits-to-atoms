import {
  TransportServiceProvider,
  TransmutationServiceProvider,
  ServiceType
} from '../types';

export interface HumanWorker
  extends TransportServiceProvider,
    TransmutationServiceProvider {
  type: ServiceType.HumanWorker;
}

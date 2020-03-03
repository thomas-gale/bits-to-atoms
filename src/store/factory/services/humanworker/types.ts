import {
  TransportServiceProvider,
  TransmutationServiceProvider
} from '../types';

export interface HumanWorker
  extends TransportServiceProvider,
    TransmutationServiceProvider {}

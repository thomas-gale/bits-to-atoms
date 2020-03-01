import {
  TransportServiceProvider,
  TransformationServiceProvider
} from '../types';

export interface HumanWorker
  extends TransportServiceProvider,
    TransformationServiceProvider {}

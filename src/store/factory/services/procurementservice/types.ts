import { ServiceType, TransmutationServiceProvider } from '../types';

export interface ProcurementService extends TransmutationServiceProvider {
  type: ServiceType.Procurement;
}

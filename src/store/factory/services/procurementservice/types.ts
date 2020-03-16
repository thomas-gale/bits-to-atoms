import { ServiceType, ProcurementServiceProvider } from '../types';

export interface ProcurementService extends ProcurementServiceProvider {
  type: ServiceType.Procurement;
}

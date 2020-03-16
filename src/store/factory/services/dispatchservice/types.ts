import { ServiceType, DispatchServiceProvider } from '../types';

export interface DispatchService extends DispatchServiceProvider {
  type: ServiceType.Dispatch;
}

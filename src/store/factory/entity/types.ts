import { Identity } from '../../common/identity/types';
import { Parameter } from '../../common/parameter/types';

export interface Entity {
  id: Identity;
  parameters: Parameter[];
}

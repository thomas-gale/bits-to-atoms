import { KeyInfo } from '@textile/hub';
import { config } from '../../env/config';
import { Textile, User } from './types';

export const createInsecureKey = (): KeyInfo => {
  return {
    key: config.textile.insecureKey,
  };
};

export const createTextile = ({
  detailsVisible = false,
  user = undefined as undefined | User,
  token = '',
} = {}): Textile => {
  return {
    detailsVisible,
    user,
    token,
  };
};

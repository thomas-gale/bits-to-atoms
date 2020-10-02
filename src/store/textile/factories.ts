import { Textile, User } from './types';

export const createTextile = ({
  user = undefined as undefined | User,
} = {}): Textile => {
  return {
    user,
  };
};

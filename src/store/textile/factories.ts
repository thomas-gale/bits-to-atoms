import { Textile, User } from './types';

export const createTextile = ({
  detailsVisible = false,
  user = undefined as undefined | User,
} = {}): Textile => {
  return {
    detailsVisible,
    user,
  };
};

import React from 'react';
import Gun from 'gun/gun';

export const OrbitKVDbContext = React.createContext<
  undefined | ReturnType<typeof Gun>
>(undefined);

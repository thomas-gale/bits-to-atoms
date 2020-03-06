import React from 'react';
import { BasicParameterProps } from './types';
import { TextField } from '@material-ui/core';

export function BasicParameter(props: BasicParameterProps): JSX.Element {
  const { input, displayName } = props;
  return <TextField label={displayName} {...input} />;
}

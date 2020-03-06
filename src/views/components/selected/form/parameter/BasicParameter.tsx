import React from 'react';
import { BasicParameterProps } from './types';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  field: {
    margin: theme.spacing(1),
    flexGrow: 1
  }
}));

export function BasicParameter(props: BasicParameterProps): JSX.Element {
  const { input, displayName } = props;
  const classes = useStyles();
  return <TextField className={classes.field} label={displayName} {...input} />;
}

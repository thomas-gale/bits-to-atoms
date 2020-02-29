import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, CardContent, TextField } from '@material-ui/core';
import { Parameter } from '../../../store/selected/types';

type Props = {
  parameter: Parameter;
};

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: theme.spacing(2),
    flexGrow: 1
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

export function BasicParameter({
  input,
  parameter,
  ...custom
}: any): JSX.Element {
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {parameter.identity.displayName}
        </Typography>
        <TextField {...input} {...custom} />
      </CardContent>
    </Card>
  );
}

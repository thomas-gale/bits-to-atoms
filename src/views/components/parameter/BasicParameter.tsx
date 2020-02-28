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

export function BasicParameter(props: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {props.parameter.identity.displayName}
        </Typography>
        <TextField
          id={props.parameter.identity.uuid}
          value={props.parameter.value}
        />
      </CardContent>
    </Card>
  );
}

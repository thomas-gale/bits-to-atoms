import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, CardContent, TextField } from '@material-ui/core';
//import { Parameter } from '../../../../store/common/parameter/types';

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

type BasicParameterProps = {
  input: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  name: string;
};

export function BasicParameter(props: BasicParameterProps): JSX.Element {
  const classes = useStyles();
  const { input, name } = props;
  return (
    <Card className={classes.container}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {name}
        </Typography>
        <TextField {...input} />
      </CardContent>
    </Card>
  );
}

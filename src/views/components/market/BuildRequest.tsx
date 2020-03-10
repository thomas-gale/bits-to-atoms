import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { BuildRequest } from '../../../store/market/types';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Identity } from '../../../store/common/identity/types';
import { Grid } from '@material-ui/core';

interface Props {
  buildRequest: BuildRequest;
}

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    padding: theme.spacing(2)
  },
  title: {
    fontSize: 14
  },
  subTitle: {
    marginBottom: theme.spacing(2)
  },
  footer: {
    marginTop: theme.spacing(2)
  }
}));

export function BuildRequestElement(props: Props) {
  const classes = useStyles();
  const { identity, created, fixedValue } = props.buildRequest;

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Build Request
      </Typography>
      <Typography variant="h5" component="h2">
        {identity.displayName}
      </Typography>
      <Typography className={classes.subTitle} color="textSecondary">
        {identity.uuid}
      </Typography>
      <Typography color="textSecondary">
        Created: {created.toLocaleTimeString()}
      </Typography>

      <Grid
        className={classes.footer}
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Button variant="contained" color="primary" size="small">
            Bid
          </Button>
        </Grid>
        <Grid item>
          <Typography color="textSecondary">
            Value: ${fixedValue.dollars}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

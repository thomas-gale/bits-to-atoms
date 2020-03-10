import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { BuildRequest } from '../../../store/market/types';
import { Button, Card, Grid, Grow } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

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
    <Grow in={true}>
      <Card className={classes.root}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
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
    </Grow>
  );
}

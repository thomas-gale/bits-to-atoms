import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';

import DesignListing from './market/BuildRequest';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    flexGrow: 1
  }
}));

export function MarketPanel(): JSX.Element {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DesignListing />
        </Grid>
        <Grid item xs={12}>
          <DesignListing />
        </Grid>
      </Grid>
    </Box>
  );
}

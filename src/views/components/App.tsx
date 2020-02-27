import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { Viewer } from './Viewer';
import { TopNav } from './TopNav';
import { MarketPanel } from './MarketPanel';

const useStyles = makeStyles(theme => ({
  fullScreen: {
    margin: 0,
    height: '100vh',
    width: '100vw'
  },
  uiOverlay: {
    position: 'fixed' /* Sit on top of the page content */,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  uiPrimaryGridContainer: {
    justify: 'flex-start'
  }
}));

export function App(): JSX.Element {
  const classes = useStyles();

  return (
    <Box className={classes.fullScreen}>
      <Viewer />
      <Box className={classes.uiOverlay}>
        <Grid container className={classes.uiPrimaryGridContainer}>
          <Grid item xs={12}>
            <TopNav />
          </Grid>
          <Grid item xs={3}>
            <MarketPanel />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { Factory } from './factory/Factory';
import TopNav from './TopNav';
import MarketPanel from './market/MarketPanel';
import SelectedPanel from './selected/SelectedPanel';

const useStyles = makeStyles(_ => ({
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
    pointerEvents: 'none'
  },
  uiPrimaryGridContainer: {
    justify: 'flex-start'
  },
  uiPrimaryGridElement: {
    pointerEvents: 'auto'
  }
}));

export function App(): JSX.Element {
  const classes = useStyles();

  return (
    <Box className={classes.fullScreen}>
      <Factory />
      <Box className={classes.uiOverlay}>
        <Grid container className={classes.uiPrimaryGridContainer}>
          <Grid item xs={12}>
            <div className={classes.uiPrimaryGridElement}>
              <TopNav />
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.uiPrimaryGridElement}>
              <MarketPanel />
            </div>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <div className={classes.uiPrimaryGridElement}>
              <SelectedPanel />
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

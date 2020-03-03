import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { Factory } from './factory/Factory';
import TopNav from './TopNav';
import MarketPanel from './market/MarketPanel';
import SelectedPanel from './selected/SelectedPanel';

import { RootState } from '../../store';
import { marketVisibleSelector } from '../../store/market/selectors';

function mapState(state: RootState) {
  return {
    marketVisible: marketVisibleSelector(state)
  };
}

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

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

function App(props: Props): JSX.Element {
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
          {props.marketVisible ? (
            <Grid item xs={9}>
              <Box width={1/3} className={classes.uiPrimaryGridElement}>
                <MarketPanel />
              </Box>
            </Grid>
          ) : (
            <Grid item xs={9}></Grid>
          )}

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

export default connector(App);

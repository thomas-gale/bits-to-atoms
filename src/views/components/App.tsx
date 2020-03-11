import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Factory from './factory/Factory';
import TopNav from './TopNav';
import MarketPanel from './market/MarketPanel';
import SelectedPanel from './selected/SelectedPanel';
import FactoryPanel from './factory/FactoryPanel';

import { RootState } from '../../store';
import { marketFactoryPanelVisibiltySelector } from '../../store/selected/selectors';
import { MarketFactoryPanelVisibilty } from '../../store/selected/types';

function mapState(state: RootState) {
  return {
    marketFactoryPanelVisibilty: marketFactoryPanelVisibiltySelector(state)
  };
}

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles(_ => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },
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
    pointerEvents: 'none',
    height: '100vh',
    maxHeight: '100vh'
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

  const { marketFactoryPanelVisibilty } = props;

  const MarketFactoryPanel = () => {
    switch (marketFactoryPanelVisibilty) {
      case MarketFactoryPanelVisibilty.Factory:
        return (
          <Grid item xs={9}>
            <Box width={1 / 3} className={classes.uiPrimaryGridElement}>
              <FactoryPanel />
            </Box>
          </Grid>
        );
      case MarketFactoryPanelVisibilty.Market:
        return (
          <Grid item xs={9}>
            <Box width={1 / 3} className={classes.uiPrimaryGridElement}>
              <MarketPanel />
            </Box>
          </Grid>
        );
      default:
        return <Grid item xs={9}></Grid>;
    }
  };

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
          <MarketFactoryPanel />
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

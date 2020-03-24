import { Backdrop, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { SizeMe } from 'react-sizeme';
import { RootDispatch, RootState } from '../../store';
import { informationOverlayVisibleSelector } from '../../store/information/selectors';
import { hideInformationOverlay } from '../../store/information/slice';
import {
  marketFactoryPanelVisibiltySelector,
  primaryFocusBuildRequestSelector,
} from '../../store/selected/selectors';
import { MarketFactoryPanelVisibilty } from '../../store/selected/types';
import BuildRequestDetails from './buildrequest/BuildRequestDetails';
import Factory from './factory/Factory';
import FactoryPanel from './factory/FactoryPanel';
import { InformationOverlay } from './information/InformationOverlay';
import MarketPanel from './market/MarketPanel';
import SelectedPanel from './selected/SelectedPanel';
import TopNav from './TopNav';

function mapState(state: RootState) {
  return {
    informationOverlayVisible: informationOverlayVisibleSelector(state),
    marketFactoryPanelVisibilty: marketFactoryPanelVisibiltySelector(state),
    primaryFocusBuildRequest: primaryFocusBuildRequestSelector(state),
  };
}

function mapDispatch(dispatch: RootDispatch) {
  return {
    onHideInfoPanel: () => {
      dispatch(hideInformationOverlay());
    },
  };
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
  fullScreen: {
    margin: 0,
    height: '100vh',
    width: '100vw',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    pointerEvents: 'auto',
  },
  uiOverlay: {
    position: 'fixed' /* Sit on top of the page content */,
    top: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
    height: '100vh',
    maxHeight: '100vh',
  },
  uiPrimaryGridContainer: {
    justify: 'flex-start',
  },
  uiPrimaryGridElement: {
    pointerEvents: 'auto',
  },
}));

function App(props: Props): JSX.Element {
  const classes = useStyles();

  const {
    informationOverlayVisible,
    marketFactoryPanelVisibilty,
    primaryFocusBuildRequest,
    onHideInfoPanel,
  } = props;

  const MarketFactoryPanel = () => {
    switch (marketFactoryPanelVisibilty) {
      case MarketFactoryPanelVisibilty.Factory:
        return (
          <Grid item xs={3}>
            <Box className={classes.uiPrimaryGridElement}>
              <FactoryPanel />
            </Box>
          </Grid>
        );
      case MarketFactoryPanelVisibilty.Market:
        return (
          <Grid item xs={3}>
            <SizeMe>
              {({ size }) => (
                <Box className={classes.uiPrimaryGridElement}>
                  <MarketPanel height={size.height} width={size.width} />
                </Box>
              )}
            </SizeMe>
          </Grid>
        );
      default:
        return <Grid item xs={3}></Grid>;
    }
  };

  const PrimaryFocusPanel = () => {
    if (primaryFocusBuildRequest) {
      return (
        <Grid item xs={6}>
          <Box className={classes.uiPrimaryGridElement}>
            <BuildRequestDetails />
          </Box>
        </Grid>
      );
    } else {
      return <Grid item xs={6}></Grid>;
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
          <PrimaryFocusPanel />
          <Grid item xs={3}>
            <div className={classes.uiPrimaryGridElement}>
              <SelectedPanel />
            </div>
          </Grid>
        </Grid>
        <Backdrop
          className={classes.backdrop}
          open={informationOverlayVisible}
          onClick={onHideInfoPanel}
        >
          <InformationOverlay />
        </Backdrop>
      </Box>
    </Box>
  );
}

export default connector(App);

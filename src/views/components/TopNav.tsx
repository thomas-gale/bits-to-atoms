import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BusinessIcon from '@material-ui/icons/Business';
import GitHubIcon from '@material-ui/icons/GitHub';
import InfoIcon from '@material-ui/icons/Info';
import TimelineIcon from '@material-ui/icons/Timeline';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { config } from '../../env/config';
import { RootDispatch, RootState } from '../../store';
import { factoryIdentitySelector } from '../../store/factory/selectors';
import { showInformationOverlay } from '../../store/information/slice';
import { marketFactoryPanelVisibiltySelector } from '../../store/selected/selectors';
import { setMarketFactoryPanelVisibilty } from '../../store/selected/slice';
import { MarketFactoryPanelVisibilty } from '../../store/selected/types';

function mapState(state: RootState) {
  return {
    marketFactoryPanelVisibilty: marketFactoryPanelVisibiltySelector(state),
    factoryIdentity: factoryIdentitySelector(state),
  };
}

function mapDispatch(dispatch: RootDispatch) {
  return {
    onFactoryClicked: () => {
      dispatch(
        setMarketFactoryPanelVisibilty(MarketFactoryPanelVisibilty.Factory)
      );
    },
    onMarketClicked: () => {
      dispatch(
        setMarketFactoryPanelVisibilty(MarketFactoryPanelVisibilty.Market)
      );
    },
    onShowInfoPanel: () => {
      dispatch(showInformationOverlay());
    },
  };
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function TopNav(props: Props): JSX.Element {
  const classes = useStyles();
  const {
    marketFactoryPanelVisibilty,
    factoryIdentity,
    onFactoryClicked,
    onMarketClicked,
    onShowInfoPanel,
  } = props;

  return (
    <Box className={classes.container}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="factory"
            disabled={
              marketFactoryPanelVisibilty ===
              MarketFactoryPanelVisibilty.Factory
            }
            onClick={onFactoryClicked}
          >
            <BusinessIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="market"
            disabled={
              marketFactoryPanelVisibilty === MarketFactoryPanelVisibilty.Market
            }
            onClick={onMarketClicked}
          >
            <TimelineIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            {factoryIdentity.displayName} : {factoryIdentity.id}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="github"
            href={config.topNav.gitHubURL}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="info"
            onClick={onShowInfoPanel}
          >
            <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default connector(TopNav);

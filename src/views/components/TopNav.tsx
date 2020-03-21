import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import TimelineIcon from '@material-ui/icons/Timeline';
import BusinessIcon from '@material-ui/icons/Business';

import { RootState, RootDispatch } from '../../store';
import { config } from '../../env/config';
import { MarketFactoryPanelVisibilty } from '../../store/selected/types';
import { setMarketFactoryPanelVisibilty } from '../../store/selected/slice';
import { factorySelector } from '../../store/factory/selectors';
import { marketFactoryPanelVisibiltySelector } from '../../store/selected/selectors';

function mapState(state: RootState) {
  return {
    marketFactoryPanelVisibilty: marketFactoryPanelVisibiltySelector(state),
    factory: factorySelector(state)
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
    }
  };
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function TopNav(props: Props): JSX.Element {
  const classes = useStyles();
  const { factory } = props;

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
              props.marketFactoryPanelVisibilty ===
              MarketFactoryPanelVisibilty.Factory
            }
            onClick={props.onFactoryClicked}
          >
            <BusinessIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="market"
            disabled={
              props.marketFactoryPanelVisibilty ===
              MarketFactoryPanelVisibilty.Market
            }
            onClick={props.onMarketClicked}
          >
            <TimelineIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            {factory.displayName} : {factory.id}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="github"
            href={config.topNav.gitHubURL}
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default connector(TopNav);

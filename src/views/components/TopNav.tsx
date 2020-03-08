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

import { RootState, RootDispatch } from '../../store';
import { config } from '../../env/config';
import { factorySelector } from '../../store/factory/selectors';
import { toggleVisible } from '../../store/market/slice';

function mapState(state: RootState) {
  return {
    factory: factorySelector(state)
  };
}

function mapDispatch(dispatch: RootDispatch) {
  return {
    toggleMarketVisible: () => {
      dispatch(toggleVisible());
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
            aria-label="markets"
            onClick={_ => props.toggleMarketVisible()}
          >
            <TimelineIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {factory.identity.displayName} : {factory.identity.uuid}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="github"
            href={config.GitHubURL}
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default connector(TopNav);

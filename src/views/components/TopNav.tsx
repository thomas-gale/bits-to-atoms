import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { factorySelector } from '../../store/factory/selectors';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';

function mapState(state: RootState) {
  return {
    factory: factorySelector(state)
  };
}

const connector = connect(mapState);

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
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {factory.stats.id.displayName} : {factory.stats.id.uuid}
          </Typography>
          {/*<Button color="inherit">Login</Button>*/}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default connector(TopNav);

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, AppBar, IconButton, Toolbar, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import { Viewer } from './Viewer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  fullScreen: {
    margin: 0,
    height: "100vh",
    width: "100vw"
  },
  uiOverlay: {
    position: "fixed", /* Sit on top of the page content */
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
}));

export function App(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.fullScreen} >
      <Viewer />
      <div className={classes.uiOverlay} >
        <Grid container spacing={3} className={classes.fullScreen}>
          <Grid item xs={12}>
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
                  bits-to-atoms
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </Grid>
      </Grid>
      </div>
    </div>
  );
}

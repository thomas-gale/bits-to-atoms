import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  CardActions,
  Button,
  CardContent
} from '@material-ui/core';

import { RootState } from '../../store';
import { selectedSelector } from '../../store/selected/selector';
import { BasicParameter } from './parameter/BasicParameter';

function mapState(state: RootState) {
  return {
    selected: selectedSelector(state)
  };
}

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2),
    flexGrow: 1
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

function SelectedPanel(props: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Properties
        </Typography>
        <Typography variant="h5" component="h2">
          {props.selected.identity.displayName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.selected.identity.uuid}
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={e => {
            e.preventDefault();
            console.log('Submit Clicked');
          }}
        >
          {props.selected.parameters.map(parameter => {
            return (
              <BasicParameter
                key={parameter.identity.uuid}
                parameter={parameter}
              />
            );
          })}
          <Button type="submit" color="primary" size="small">
            Update
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default connector(SelectedPanel);

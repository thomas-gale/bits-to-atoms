import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Button, CardContent } from '@material-ui/core';

import { RootState, AppDispatch } from '../../store';
import { selectedSelector } from '../../store/selected/selector';
import { BasicParameter } from './parameter/BasicParameter';
import { createExistingIdentity } from '../../store/common/types';
import { setParameter } from '../../store/selected/slice';
import { ParameterType } from '../../store/selected/types';
import {
  setFloorSpaceXLength,
  setFloorSpaceYLength
} from '../../store/factory/slice';

function mapState(state: RootState) {
  return {
    selected: selectedSelector(state)
  };
}

function mapDispatch(dispatch: AppDispatch) {
  return {
    onSubmit: (event: any) => {
      const xParam = {
        identity: createExistingIdentity('X Length', 'id-test-length-x'),
        type: ParameterType.NUMBER,
        value: '10'
      };
      const yParam = {
        identity: createExistingIdentity('Y Length', 'id-test-length-y'),
        type: ParameterType.NUMBER,
        value: '8'
      };

      dispatch(setParameter(xParam));
      dispatch(setParameter(yParam));
      dispatch(setFloorSpaceXLength(Number(xParam.value)));
      dispatch(setFloorSpaceYLength(Number(yParam.value)));
    }
  };
}

const connector = connect(mapState, mapDispatch);

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
            props.onSubmit(e);
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

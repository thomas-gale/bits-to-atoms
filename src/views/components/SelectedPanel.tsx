import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, CardContent } from '@material-ui/core';
import SelectedForm from './parameter/SelectedForm';

import { RootState, AppDispatch } from '../../store';
import { selectedSelector } from '../../store/selected/selector';
import { createExistingIdentity } from '../../store/common/types';
import { setParameter } from '../../store/selected/slice';
import { ParameterType, Parameter } from '../../store/selected/types';
import {
  setFloorSpaceXLength,
  setFloorSpaceYLength
} from '../../store/factory/slice';

export interface FloorspaceParmeters {
  idtestlengthx: number;
  idtestlengthy: number;
}

function mapState(state: RootState) {
  return {
    selected: selectedSelector(state),
    initialValues: {
      idtestlengthx: 4.2,
      idtestlengthy: 3.5
    }
  };
}

function mapDispatch(dispatch: AppDispatch) {
  return {
    handleSubmit: (values: FloorspaceParmeters) => {
      const floorspaceParamValues = values as FloorspaceParmeters;
      const xParam = {
        identity: createExistingIdentity('X Length', 'idtestlengthx'),
        type: ParameterType.NUMBER,
        value: floorspaceParamValues.idtestlengthx.toString()
      } as Parameter;
      const yParam = {
        identity: createExistingIdentity('Y Length', 'idtestlengthy'),
        type: ParameterType.NUMBER,
        value: floorspaceParamValues.idtestlengthy.toString()
      } as Parameter;

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
        <SelectedForm
          initialValues={props.initialValues}
          selected={props.selected}
          onSubmit={props.handleSubmit}
        />
      </CardContent>
    </Card>
  );
}

export default connector(SelectedPanel);

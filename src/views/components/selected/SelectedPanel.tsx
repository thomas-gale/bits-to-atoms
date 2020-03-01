import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, CardContent } from '@material-ui/core';
import SelectedForm from './parameter/SelectedForm';

import { RootState, AppDispatch } from '../../../store';
import { ParameterType, Parameter } from '../../../store/selected/types';
import { FloorSpace } from '../../../store/factory/services/floorspace/types';

import {
  setXLength,
  setYLength
} from '../../../store/factory/services/floorspace/slice';
import { setParameter } from '../../../store/selected/slice';
import { createExistingIdentity } from '../../../store/common/typeFactoryMethods';
import { selectedSelector } from '../../../store/selected/selectors';
import { floorSpaceSelector } from '../../../store/factory/services/floorspace/selectors';

function mapState(state: RootState) {
  return {
    selected: selectedSelector(state),
    initialValues: floorSpaceSelector(state)
  };
}

function mapDispatch(dispatch: AppDispatch) {
  return {
    handleSubmit: (values: FloorSpace) => {
      const xParam = {
        identity: createExistingIdentity('X Length', 'xLength'),
        type: ParameterType.NUMBER,
        value: values.xLength.toString()
      } as Parameter;
      const yParam = {
        identity: createExistingIdentity('Y Length', 'yLength'),
        type: ParameterType.NUMBER,
        value: values.yLength.toString()
      } as Parameter;

      dispatch(setParameter(xParam));
      dispatch(setParameter(yParam));
      dispatch(setXLength(Number(xParam.value)));
      dispatch(setYLength(Number(yParam.value)));
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

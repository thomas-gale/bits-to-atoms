import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState, RootDispatch } from '../../../store';
//import { selectedServiceProviderSelector } from '../../../store/selected/selectors';

import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, CardContent } from '@material-ui/core';
//import IdentityForm from './form/entity/IdentityForm';
//import LocationForm from './form/entity/LocationForm';
//import OrientationForm from './form/entity/OrientationForm';

function mapState(_state: RootState) {
  return {};
}

function mapDispatch(_dispatch: RootDispatch) {
  return {};
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2),
    flexGrow: 1,
    overflow: 'auto',
    maxHeight: '90vh' // Couldn't find a nicer way. Be cool if I could reference the max height of
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

function FactoryPanel(_props: Props): JSX.Element {
  const classes = useStyles();

  //const { selected } = props;

  return (
    <Card className={classes.container}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Factory
        </Typography>
        {/* 
        <IdentityForm />
        <LocationForm />
        <OrientationForm />
        */}
      </CardContent>
    </Card>
  );
}

export default connector(FactoryPanel);

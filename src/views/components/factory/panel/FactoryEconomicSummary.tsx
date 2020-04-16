import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState, RootDispatch } from '../../../../store';
import { factoryEconomicSummarySelector } from '../../../../store/factory/selectors';

import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, CardContent } from '@material-ui/core';
import { dollarFormatter } from '../../../../store/economic/factories';

function mapState(state: RootState) {
  return {
    factoryEconomicSummary: factoryEconomicSummarySelector(state),
  };
}

function mapDispatch(_dispatch: RootDispatch) {
  return {};
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles((_theme) => ({
  container: {
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
  },
}));

function FactoryEconomicSummary(props: Props): JSX.Element {
  const classes = useStyles();
  const { factoryEconomicSummary } = props;

  return (
    <Card className={classes.container}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Economic Summary
        </Typography>
        <Typography color="textPrimary">
          Liquid Assets:{' '}
          {dollarFormatter.format(
            factoryEconomicSummary.currentAssetsValue.value.dollars
          )}
        </Typography>
        <Typography color="textPrimary">
          Total In:{' '}
          {dollarFormatter.format(factoryEconomicSummary.totalIn.value.dollars)}
        </Typography>
        <Typography color="textPrimary">
          Total Out:{' '}
          {dollarFormatter.format(
            factoryEconomicSummary.totalOut.value.dollars
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default connector(FactoryEconomicSummary);

import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';

import { RootState, RootDispatch } from '../../../../../store';
import { Identity } from '../../../../../store/common/identity/types';
import { ReduxFormParameterUpdate } from '../../../../../store/selected/types';
import { createExistingIdentity } from '../../../../../store/common/identity/factories';
import { createNumberParameter } from '../../../../../store/common/parameter/factories';
import {
  selectedServiceProviderSelector,
  selectedServiceProviderLocationSelector
} from '../../../../../store/selected/selectors';
import { setServiceProviderParameter } from '../../../../../store/factory/slice';

import { Grid } from '@material-ui/core';
import { BasicParameter } from '../parameter/BasicParameter';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function mapState(state: RootState) {
  return {
    selectedServiceProvider: selectedServiceProviderSelector(state),
    initialValues: selectedServiceProviderLocationSelector(state)
  };
}

function mapDispatch(dispatch: RootDispatch) {
  return {
    onNumberParameterChange: (
      selectedServiceProviderId: Identity,
      serviceProviderProperty: string[],
      parameterUpdate: ReduxFormParameterUpdate,
      units: string
    ) => {
      console.log(
        `Parameter ${parameterUpdate.target.name} Changed to ${parameterUpdate.target.value}`
      );
      dispatch(
        setServiceProviderParameter({
          serviceProviderId: selectedServiceProviderId,
          serviceProviderProperty,
          parameter: createNumberParameter({
            identity: createExistingIdentity({
              displayName: parameterUpdate.target.name,
              id: parameterUpdate.target.name
            }),
            units: units,
            value: Number(parameterUpdate.target.value)
          })
        })
      );
    }
  };
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

function LocationForm(props: Props & InjectedFormProps<{}, Props>) {
  const { selectedServiceProvider, onNumberParameterChange } = props;

  if (!selectedServiceProvider) return <div />;

  const fixedProps = {
    title: 'Location',
    name: 'location',
    units: 'm'
  };

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={fixedProps.name}
        id={fixedProps.name}
      >
        <Typography>{fixedProps.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <form>
          <Grid container>
            {Object.keys(selectedServiceProvider.location).map(key => {
              return (
                <Grid key={key} item xs={4}>
                  <Field
                    name={key}
                    displayName={`${key.toUpperCase()} (${fixedProps.units})`}
                    component={BasicParameter}
                    type="number"
                    parse={(value: string) => Number(value)}
                    onChange={(change: ReduxFormParameterUpdate) =>
                      onNumberParameterChange(
                        selectedServiceProvider.id,
                        [fixedProps.name, key],
                        change,
                        fixedProps.units
                      )
                    }
                  />
                </Grid>
              );
            })}
          </Grid>
        </form>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default connector(
  reduxForm<{}, Props>({
    form: 'locationForm',
    enableReinitialize: true
  })(LocationForm)
);

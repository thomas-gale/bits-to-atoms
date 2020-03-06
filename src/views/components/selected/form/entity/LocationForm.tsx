import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, RootDispatch } from '../../../../../store';
import {
  selectedServiceProviderIdSelector,
  selectedServiceProviderLocationSelector
} from '../../../../../store/selected/selectors';

import { Identity } from '../../../../../store/common/identity/types';
import { ReduxFormParameterUpdate } from '../../../../../store/selected/types';
import { createExistingIdentity } from '../../../../../store/common/identity/factories';
import { setServiceProviderParameter } from '../../../../../store/factory/slice';

import { Typography, makeStyles } from '@material-ui/core';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { BasicParameter } from '../parameter/BasicParameter';
import {
  ParameterType,
  NumberParameter
} from '../../../../../store/common/parameter/types';

function mapState(state: RootState) {
  return {
    selectedId: selectedServiceProviderIdSelector(state),
    initialValues: selectedServiceProviderLocationSelector(state)
  };
}

function mapDispatch(dispatch: RootDispatch) {
  return {
    onNumberParameterChange: (
      parameterUpdate: ReduxFormParameterUpdate,
      selectedServiceProviderId: Identity,
      units: string
    ) => {
      console.log(
        `Parameter ${parameterUpdate.target.name} Changed to ${parameterUpdate.target.value}`
      );
      dispatch(
        setServiceProviderParameter({
          serviceProviderId: selectedServiceProviderId,
          parameter: {
            identity: createExistingIdentity(
              parameterUpdate.target.name,
              parameterUpdate.target.name
            ),
            type: ParameterType.Number,
            units,
            value: Number(parameterUpdate.target.value)
          } as NumberParameter
        })
      );
    }
  };
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const useStyles = makeStyles(_ => ({
  pos: {
    marginBottom: 12
  }
}));

class LocationForm extends React.Component<
  Props & InjectedFormProps<{}, Props>
> {
  render() {
    const { selectedId, onNumberParameterChange } = this.props;
    //const classes = useStyles();
    return (
      <form>
        <Field
          key={'x'}
          name={'x'}
          displayName="X"
          component={BasicParameter}
          type="number"
          parse={(value: string) => Number(value)}
          onChange={(change: ReduxFormParameterUpdate) =>
            onNumberParameterChange(change, selectedId, 'm')
          }
        />
        <Field
          key={'y'}
          name={'y'}
          displayName="Y"
          component={BasicParameter}
          type="number"
          parse={(value: string) => Number(value)}
          onChange={(change: ReduxFormParameterUpdate) =>
            onNumberParameterChange(change, selectedId, 'm')
          }
        />
        <Field
          key={'z'}
          name={'z'}
          displayName="Z"
          component={BasicParameter}
          type="number"
          parse={(value: string) => Number(value)}
          onChange={(change: ReduxFormParameterUpdate) =>
            onNumberParameterChange(change, selectedId, 'm')
          }
        />
      </form>
    );
  }
}

export default connector(
  reduxForm<{}, Props>({
    form: 'locationForm',
    enableReinitialize: true
  })(LocationForm)
);

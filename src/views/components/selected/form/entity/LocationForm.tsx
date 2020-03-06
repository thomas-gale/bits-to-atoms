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

//import { makeStyles } from '@material-ui/core';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { BasicParameter } from '../parameter/BasicParameter';
import { createNumberParameter } from '../../../../../store/common/parameter/factories';

function mapState(state: RootState) {
  return {
    selectedId: selectedServiceProviderIdSelector(state),
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
          parameter: createNumberParameter(
            createExistingIdentity(
              parameterUpdate.target.name,
              parameterUpdate.target.name
            ),
            units,
            Number(parameterUpdate.target.value)
          )
        })
      );
    }
  };
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

/*const useStyles = makeStyles(_ => ({
  pos: {
    marginBottom: 12
  }
}));*/

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
            onNumberParameterChange(selectedId, ['location', 'x'], change, 'm')
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
            onNumberParameterChange(selectedId, ['location', 'y'], change, 'm')
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
            onNumberParameterChange(selectedId, ['location', 'z'], change, 'm')
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

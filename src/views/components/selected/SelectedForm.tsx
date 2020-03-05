import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { BasicParameter } from './parameter/BasicParameter';

import { RootState, AppDispatch } from '../../../store';
import { Parameter } from '../../../store/common/parameter/types';
import { FloorSpace } from '../../../store/factory/services/floorspace/types';
import {
  selectedParametersSelector,
  selectedParameterInitialValuesSelector
} from '../../../store/selected/selectors';

type ParameterUpdate = {
  target: {
    name: string;
    value: string;
  };
};

function mapState(state: RootState) {
  return {
    parameters: selectedParametersSelector(state),
    initialValues: selectedParameterInitialValuesSelector(state)
  };
}

function mapDispatch(_: AppDispatch) {
  return {
    /*handleSubmit: (_: FloorSpace) => {
      console.log('Submit to be handled');
    },
    setParameter: () => {
      console.log('Parameter Set');
    },*/
    onParameterChange: (update: ParameterUpdate) => {
      console.log(
        `Parameter ${update.target.name} Changed to ${update.target.value}`
      );
    }
  };
}

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

class SelectedForm extends React.Component<
  Props & InjectedFormProps<FloorSpace, Props>
> {
  render() {
    const { parameters, onParameterChange } = this.props;
    return (
      <form>
        {' '}
        {/*onSubmit={handleSubmit}*/}
        {parameters.map((parameter: Parameter) => {
          return (
            <Field
              key={parameter.identity.uuid}
              name={parameter.identity.uuid}
              component={BasicParameter}
              type="number"
              parse={(value: string) => Number(value)}
              //onChange={() => onParameterChange()}
              onChange={onParameterChange}
              parameter={parameter}
            />
          );
        })}
        {/*<Button type="submit" color="primary" size="small">
          Update
      </Button>*/}
      </form>
    );
  }
}

export default connector(
  reduxForm<FloorSpace, Props>({
    form: 'selectedForm',
    enableReinitialize: true
  })(SelectedForm)
);

import React from 'react';
import { Button } from '@material-ui/core';

import { BasicParameter } from './BasicParameter';
import { Selected } from '../../../store/selected/types';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

export interface SelectedParameters {
  selected: Selected;
  testName: string;
}

type Props = SelectedParameters & InjectedFormProps<{}, SelectedParameters>;

function SelectedForm(props: Props) {
  const { /*form, initialValues, error,*/ selected, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      {selected.parameters.map(parameter => {
        return (
          <Field
            key={parameter.identity.uuid}
            name={parameter.identity.uuid}
            component={BasicParameter}
            type="text"
            parameter={parameter}
          />
        );
      })}
      <Button type="submit" color="primary" size="small">
        Update
      </Button>
    </form>
  );
}

export default reduxForm<{}, SelectedParameters>({
  form: 'selectedForm'
})(SelectedForm);

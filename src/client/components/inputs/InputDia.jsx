import React from 'react';
import { TextInput, NumberInput, DateInput, Select, TextArea, Switch } from '~/components/form/form/inputs';
import Button from '@material-ui/core/Button';

const Component = props => (
    <NumberInput
        {...props}
    />
);

Component.defaultProps = {
    precision: 0,
    maxLength: 2,
    min: 1,
    max: 31,
};

export default Component;

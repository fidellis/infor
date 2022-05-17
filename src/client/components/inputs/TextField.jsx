import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const Component = ({ ...props }) => (
    <TextField
        {...props} />
);

Component.defaultProps = {
    variant: 'outlined',
    value: '',
    fullWidth: true,
    disabled: false,
    readOnly: true,
};

export default Component;
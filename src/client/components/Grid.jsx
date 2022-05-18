import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

const Component = props => (
    <Grid {...props} />
);

Component.defaultProps = {
    // direction: 'row',
    // wrap: 'wrap'
};

export default Component;

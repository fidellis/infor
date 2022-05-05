import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const Component = props => (
  <Button
    {...props}
  />
);

Component.defaultProps = {
  variant: 'contained',
  // variant: 'outlined',  
  color: 'primary',
};

export default Component;

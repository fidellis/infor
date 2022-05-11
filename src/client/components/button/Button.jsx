import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '../icons/Icon';

const Component = ({ startIcon, endIcon, ...props }) => {
  if (startIcon) props.startIcon = <Icon>{startIcon}</Icon>
  if (endIcon) props.endIcon = <Icon>{endIcon}</Icon>
  return (
    <Button
      {...props}
    />
  )
};

Component.defaultProps = {
  variant: 'contained',
  // variant: 'outlined',  
  color: 'primary',
};

export default Component;

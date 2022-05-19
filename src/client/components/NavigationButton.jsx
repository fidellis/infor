import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from './button/ButtonGroup';

const Component = ({ ...props }) => (
  <ButtonGroup {...props} />
);

Component.defaultProps = {
  style: {
    position: 'fixed',
    right: 20,
    bottom: 20,
    zIndex: 1,
  }
};

export default Component;

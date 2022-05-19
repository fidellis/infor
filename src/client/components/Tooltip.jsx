import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const Component = ({ children, ...props }) => (<Tooltip {...props}>{children}</Tooltip>);

Component.propTypes = {
    children: PropTypes.node.isRequired,
};

Component.defaultProps = {};

export default Component;
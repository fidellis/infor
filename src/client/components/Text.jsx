import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Component = ({ children, ...props }) => (<Typography {...props}>{children}</Typography>);

Component.propTypes = {
    children: PropTypes.node.isRequired,
};

Component.defaultProps = {
    gutterBottom: true,
    component: "div",
};

export default Component;

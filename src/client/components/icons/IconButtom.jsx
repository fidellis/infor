import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Icon from './Icon';

const Component = ({ children, fontSize, ...props }) => (<IconButton {...props}><Icon fontSize={fontSize}>{children}</Icon></IconButton>);

Component.propTypes = {
    children: PropTypes.node.isRequired,
};

Component.defaultProps = {
    // fontSize: "small",
    // fontSize:"large",  
};

export default Component;
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from '~/components/icons/Icon';

const Component = ({ icon, actions, ...props }) => {
    return (
        <Menu
            {...props}
        >
            {actions.filter(a => a.hide !== true).map(({ label, icon, disabled, onClick }) => (
                <MenuItem onClick={onClick} disabled={disabled}>
                    {icon &&
                        <ListItemIcon>
                            <Icon fontSize="small">{icon}</Icon>
                        </ListItemIcon>}
                    {label}
                </MenuItem>
            ))}
        </Menu>)
};

Component.propTypes = {
    children: PropTypes.node.isRequired,
};

Component.defaultProps = {
    keepMounted: true,
    actions: [],
    disabled: false,
};

export default Component;

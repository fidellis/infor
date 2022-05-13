import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '~/components/menu/Menu';
import Icon from '~/components/icons/Icon';

const Component = ({ icon, ...props }) => {
    const [openMenu, setOpenMenu] = useState(false);

    function handleClick(event) {
        setOpenMenu(event.currentTarget);
    };

    function handleClose() {
        setOpenMenu(false);
    };

    return (
        <div>
            <Icon key="menu" onClick={handleClick}>{icon}</Icon>
            <Menu
                {...props}
                anchorEl={openMenu}
                open={openMenu}
                onClose={handleClose}
            />
        </div>)
};

Component.propTypes = {
    children: PropTypes.node.isRequired,
};

Component.defaultProps = {
    keepMounted: true,
    icon: 'more_vert',
};

export default Component;

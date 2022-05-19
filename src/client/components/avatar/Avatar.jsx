import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '~/components/Tooltip';

const AvatarUsuario = ({ title, ...props }) => (
    <Tooltip title={title}>
        <Avatar {...props} />
    </Tooltip>
);

AvatarUsuario.propTypes = {};

AvatarUsuario.defaultProps = {
    style: { marginLeft: 'auto', marginRight: 'auto' },
};

export default AvatarUsuario;

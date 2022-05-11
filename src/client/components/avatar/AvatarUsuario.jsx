import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

import {
  HUMANOGRAMA_URL,
  AVATAR_URL,
} from '~/lib/constants';

const AvatarUsuario = ({ chave, title, ...props }) => (
  <a href={`${HUMANOGRAMA_URL}/${chave}`} target="_blank">
    <Avatar
      src={`${AVATAR_URL}${chave}`}
      title={title || chave}
      {...props}
    />
  </a>

);

AvatarUsuario.propTypes = {
  chave: PropTypes.string.isRequired,
};

AvatarUsuario.defaultProps = {
  style: { marginLeft: 'auto', marginRight: 'auto' },
};

export default AvatarUsuario;

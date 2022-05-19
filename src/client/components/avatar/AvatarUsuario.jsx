import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import { HUMANOGRAMA_URL, AVATAR_URL } from '~/lib/constants';

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

AvatarUsuario.defaultProps = {};

export default AvatarUsuario;

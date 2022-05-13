import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { PROFILE_URL, CORREIO_URL, LOGOFF_URL, ARQUIVO_URL } from '~/lib/constants';
import { isMobile } from 'react-device-detect';
import IconMenu from '~/components/icons/IconMenu';
import Icon from '~/components/icons/Icon';
import Avatar from '~/components/avatar/AvatarUsuario';
import Classificacao from './Classificacao';
import './Nav.scss';

const Nav = ({ usuario, baseUrl, search }) => {
  const { chave } = usuario;

  const actions = [
    <Classificacao usuario={usuario} />,
    <Icon key="mail" onClick={() => window.open(CORREIO_URL)}>mail</Icon>,
    <Avatar key="avatar" chave={chave} href={`${PROFILE_URL}${chave}`} />,
    <IconMenu
      id="menu-bar"
      icon="more_vert"
      actions={[
        {
          label: 'Meu Perfil',
          icon: 'account_box',
          onClick: () => window.open(`${PROFILE_URL}${chave}`, '_blank')
        },
        {
          label: 'Correio',
          icon: 'mail',
          onClick: () => window.open(CORREIO_URL, '_blank')
        },
        {
          label: 'Sair',
          icon: 'exit_to_app',
          onClick: () => window.open(`${baseUrl}${LOGOFF_URL}${location.href}`, '_blank')
        },
      ]}
    />,
  ];
  return (
    <div className="toolbar">
      <div className="logo"><img src={`${ARQUIVO_URL}/105`} width="100%" /></div>
      <div className="toolbar-container">
        <div className="toolbar-title-container">
          {isMobile && <i className="material-icons">menu</i>}
          <div className="toolbar-title">DIEMP</div>
          <div className="form">{search}</div>
        </div>
        <div className="actions">
          {actions.map(action => <div className="action">{action}</div>)}
        </div>
      </div>
    </div>);
}

Nav.propTypes = {
  usuario: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  search: PropTypes.node.isRequired,
};

export default withRouter(Nav);

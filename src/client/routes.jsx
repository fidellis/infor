
import React from 'react';
import { Redirect } from 'react-router-dom';
import ControleFerramentasList from '~/pages/controleFerramentas/ControleFerramentasList';
import ControleFerramentasForm from '~/pages/controleFerramentas/ControleFerramentasForm';
import ControleFerramentasRelatorio from '~/pages/controleFerramentas/ControleFerramentasRelatorio';

const isDev = process.env.AMBIENTE !== 'producao';

function allow({ usuario }) {
  const PREFIXOS_AUTORIZADOS = [];
  const COMISSOES_AUTORIZADAS = [];
  const MATRICULAS_AUTORIZADAS = ['F8351349'];
  const UORS_AUTORIZADAS = [283521];
  return UORS_AUTORIZADAS ||
    PREFIXOS_AUTORIZADOS.includes(usuario.prefixo) ||
    COMISSOES_AUTORIZADAS.includes(usuario.comissao_id) ||
    MATRICULAS_AUTORIZADAS.includes(usuario.chave);
}
const routes = [
  { path: '/', Component: () => <Redirect to="/controle-ferramentas" />, exact: true, link: false },
  {
    label: 'Controle de Ferramentas',
    icon: 'list',
    allow,
    itens: [
      {
        label: '',
        subitens: [
          { path: '/controle-ferramentas', label: 'Ferramentas', Component: ControleFerramentasList, allow },
          { path: '/controle-ferramentas-form/:id', label: 'Controle de Painéis e Ferramentas', Component: ControleFerramentasForm, allow, link: false },
          { path: '/controle-ferramentas-relatorio', label: 'Relatório', Component: ControleFerramentasRelatorio, allow },
        ],
      },
    ],
  },

  // { path: '/teste-config', label: 'Configurar', Component: ControleFerramentasList, icon: 'settings', allow },
];

export function getPages() {
  let pages = [];
  routes.forEach((menu) => {
    if (menu.Component) pages.push(menu);
    if (menu.itens) {
      menu.itens.forEach((item) => {
        if (item.Component) pages.push({ ...item, allow: item.allow || menu.allow, menuLabel: menu.label });
        if (item.subitens) {
          pages = pages.concat(item.subitens.map(subitem => ({ ...subitem, allow: subitem.allow || item.allow || menu.allow, itemLabel: item.label, menuLabel: menu.label })));
        }
      });
    }
  });

  return pages;
}

export default routes;


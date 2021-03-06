
import React from 'react';
import { Redirect } from 'react-router-dom';
import ControleFerramentasList from '~/pages/controleFerramentas/ControleFerramentasList';
import ControleFerramentasForm from '~/pages/controleFerramentas/ControleFerramentasForm';
import ControleFerramentasRelatorio from '~/pages/controleFerramentas/ControleFerramentasRelatorio';
import RotinaList from '~/pages/rotinas/List';
import RotinaForm from '~/pages/rotinas/Form';
import PainelList from '~/pages/paineis/List';
import PainelForm from '~/pages/paineis/Form';
import DemandaList from '~/pages/demanda/List';
import DemandaForm from '~/pages/demanda/Form';
import Demanda from '~/pages/demanda/Demanda';

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
  { path: '/', Component: () => <Redirect to="/demandas" />, exact: true, link: false },
  {
    label: 'Demandas',
    icon: 'open_in_new',
    allow,
    itens: [
      {
        label: '',
        subitens: [
          { path: '/demandas', label: 'Demandas', Component: DemandaList, allow },
          { path: '/demanda/edit/:id', label: ({ params }) => Number(params.id) ? `Demanda ${params.id}` : 'Nova Demanda', Component: DemandaForm, allow, link: false },
          { path: '/demanda/edit/0', label: 'Nova Demanda', Component: DemandaForm, allow, link: true },
          { path: '/demanda/:id', label: ({ params }) => `Demanda ${params.id}`, Component: Demanda, allow, link: false },
        ],
      },
    ],
  },
  {
    label: 'Painéis',
    icon: 'dashboard',
    allow,
    itens: [
      {
        label: '',
        subitens: [
          { path: '/rotinas', label: 'Rotinas', Component: RotinaList, allow },
          { path: '/rotina/:id', label: 'Rotina', Component: RotinaForm, allow, link: false },
          { path: '/paineis', label: 'Painéis', Component: PainelList, allow },
          { path: '/painel/:id', label: 'Painel', Component: PainelForm, allow, link: false },
        ],
      },
    ],
  },
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


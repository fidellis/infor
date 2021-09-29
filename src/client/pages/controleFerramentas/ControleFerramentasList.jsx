import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import DataTable from '~/components/data-table/DataTable';
import Aviso from '~/components/message/Aviso';
import Button from '~/components/Button';
import NavigationButton from '~/components/NavigationButton';
import { getFerramentas, getUserConfig } from './controleFerramentasHook';

const columns = {
  id: {
    label: '#',
    search: true,
    width: 50,
  },
  nome: {
    label: 'Nome',
    search: true,
  },
  'demandante.nome': {
    label: 'Demandante',
    width: 250,
    search: true,
  },
  'responsavel.nome': {
    label: 'Responsável',
    width: 250,
    search: true,
  },
  'status.nome': {
    label: 'Situação',
    width: 100,
    search: true,
  },
  'tipoSolucao.nome': {
    label: 'Tipo Solução',
    width: 100,
    search: true,
  },
  'tipoProvidencia.nome': {
    label: 'Tipo Providência',
    width: 100,
    search: true,
  },
};

const Component = (props) => {
  const [data, setData] = useState([]);
  const [response, loading] = getFerramentas({ include: ['usuarioInclusao', 'responsavel', 'demandante', 'status', 'tipoSolucao', 'tipoProvidencia'] });

  useEffect(() => {
    setData(response);
  }, [response]);

  return (
    <div>
      <DataTable
        rows={data}
        columns={columns}
        width="95%"
        count
        exportCsv
        headerHeight={80}
        onClick={({ row }) => props.history.push(`/controle-ferramentas-form/${row.id}`)}
      />

      <NavigationButton buttons={[
        {
          label: 'Adicionar Ferramenta',
          onClick: () => props.history.push('/controle-ferramentas-form/0'),
        },
      ]}
      />
    </div>
  );
};

Component.propTypes = {};
const mapStateToProps = ({ app: { usuario } }) => ({ usuario });
const mapDispatchToProps = ({ message });

export default connect(mapStateToProps, mapDispatchToProps)(Component);

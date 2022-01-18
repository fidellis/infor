import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import DataTable from '~/components/data-table/DataTable';
import Aviso from '~/components/message/Aviso';
import Button from '~/components/Button';
import NavigationButton from '~/components/NavigationButton';
import { getDados } from './hook';

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
  'tipo.nome': {
    label: 'Célula',
    width: 100,
    search: true,
  },
  'status.nome': {
    label: 'Situação',
    width: 100,
    search: true,
  },
  dataCriacao: {
    label: 'Data Criação',
    type: 'date',
    width: 100,
  },
  tags: {
    label: 'Tags',
    cellRenderer: ({ row }) => row.tags.map(t => t.nome).join(' - '),
  },
};

const Component = (props) => {
  const [data, setData] = useState([]);
  const [response] = getDados({ include: ['usuarioInclusao', 'status', 'tipo', 'tags'] });

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
        onClick={({ row }) => props.history.push(`/rotina/${row.id}`)}
      />

      <NavigationButton buttons={[
        {
          label: 'Adicionar Rotina',
          onClick: () => props.history.push('/rotina/0'),
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

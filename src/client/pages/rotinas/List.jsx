import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import { setFilter, setFilters } from '~/store/filter';
import DataTable from '~/components/data-table/DataTable';
import Aviso from '~/components/message/Aviso';
import Button from '~/components/Button';
import NavigationButton from '~/components/NavigationButton';
import { Select } from '~/components/form/form/inputs';
import { Grid } from '@material-ui/core';
import { getDados } from './hook';

const options = {
  situacao: [
    {
      value: 1,
      label: 'Vigente'
    },
    {
      value: 2,
      label: 'Não Vigente',
    },
  ]
};

const columns = {
  'tipo.nome': {
    label: 'Célula',
    width: 100,
    search: true,
  },
  'periodicidade.nome': {
    label: 'Periodicidade',
    width: 110,
    search: true,
  },
  nome: {
    label: 'Nome',
    search: true,
  },
  responsaveis: {
    label: 'Responsáveis',
    search: true,
    cellRenderer: ({ row }) => row.responsaveis.map(t => t.nome).join(' - '),
  },
};

const Component = (props) => {
  const [data, setData] = useState([]);
  const [response] = getDados({ include: ['usuarioInclusao', 'status', 'tipo', 'periodicidade', 'responsaveis'], filter: props.filter.rotina });

  useEffect(() => {
    setData(response);
  }, [response]);

  return (
    <div>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs={2}>
          <Select
            id="status_id"
            label="Situação"
            options={options.situacao}
            value={props.filter.rotina.status_id}
            onChange={({ id, value }) => props.setFilter({ id, value, filter: 'rotina' })} />
        </Grid>
        <Grid item xs={12}>
          <DataTable
            rows={data}
            columns={columns}
            count
            exportCsv
            headerHeight={80}
            onClick={({ row }) => props.history.push(`/rotina/${row.id}`)}
          />
        </Grid>



      </Grid>
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
const mapStateToProps = ({ app: { usuario }, filter }) => ({ usuario, filter });
const mapDispatchToProps = ({ message, setFilter, setFilters });

export default connect(mapStateToProps, mapDispatchToProps)(Component);

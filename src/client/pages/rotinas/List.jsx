import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import { setFilter, setFilters } from '~/store/filter';
import DataTable from '~/components/data-table/DataTable';
import SelectTipoRotina from '~/components/select/SelectTipoRotina';
import SelectStatusRotina from '~/components/select/SelectStatusRotina';
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
  ],
  automatica: [
    {
      value: true,
      label: 'Sim'
    },
    {
      value: false,
      label: 'Não',
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
  responsave1: {
    label: 'Responsável',
    width: 200,
    search: true,
    cellRenderer: ({ row }) => {
      const responsavel = row.responsaveis.find(r => r.RotinaResponsavel ? Number(r.RotinaResponsavel.tipo_id) === 1 : null);
      return responsavel ? responsavel.nome : null;
    },
  },
  responsave2: {
    label: 'Responsável Lateral 1',
    width: 200,
    search: true,
    cellRenderer: ({ row }) => {
      const responsavel = row.responsaveis.find(r => r.RotinaResponsavel ? Number(r.RotinaResponsavel.tipo_id) === 2 : null);
      return responsavel ? responsavel.nome : null;
    },
  },
  linkPop: {
    label: 'Link POP',
    search: true,
    cellRenderer: ({ row }) => {
      return <a href={row.linkPop} target="_blank">{row.linkPop}</a>
    },
  },

  // responsave3: {
  //   label: 'Responsável Lateral 2',
  //   width: 200,
  //   search: true,
  //   cellRenderer: ({ row }) => {
  //     const responsavel = row.responsaveis.find(r => r.RotinaResponsavel ? Number(r.RotinaResponsavel.tipo_id) === 3 : null);
  //     return responsavel ? responsavel.nome : null;
  //   },
  // },
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
          <SelectStatusRotina
            value={props.filter.rotina.status_id}
            onChange={({ id, value }) => props.setFilter({ id, value, filter: 'rotina' })} />
        </Grid>
        <Grid item xs={2}>
          <Select
            id="automatica"
            label="Automática"
            options={options.automatica}
            value={props.filter.rotina.automatica}
            onChange={({ id, value }) => props.setFilter({ id, value, filter: 'rotina' })} />
        </Grid>
        <Grid item xs={2}>
          <SelectTipoRotina
            value={props.filter.rotina.tipo_id}
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

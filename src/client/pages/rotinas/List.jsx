import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import { setFilter, setFilters } from '~/store/filter';
import DataTable from '~/components/data-table/DataTable';
import SelectTipoRotina from '~/components/select/SelectTipoRotina';
import SelectPeriodicidadeRotina from '~/components/select/SelectPeriodicidadeRotina';
import SelectStatusRotina from '~/components/select/SelectStatusRotina';
import SelectUsuario from '~/components/select/SelectUsuario';
import ButtonLimparFiltros from '~/components/button/ButtonLimparFiltros';
import Icon from '~/components/icons/Icon';
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
  // 'tipo.nome': {
  //   label: 'Célula',
  //   width: 100,
  //   search: true,
  // },
  'periodicidade.nome': {
    label: 'Periodicidade',
    width: 110,
    // search: true,
  },
  nome: {
    label: 'Nome',
    search: true,
  },
  responsave1: {
    label: 'Responsável',
    width: 200,
    search: true,
    lookup: true,
    cellRenderer: ({ row }) => {
      const responsavel = row.responsaveis.find(r => r.RotinaResponsavel ? Number(r.RotinaResponsavel.tipo_id) === 1 : null);
      return responsavel ? responsavel.nome : null;
    },
  },
  responsave2: {
    label: 'Responsável Lateral 1',
    width: 200,
    search: true,
    lookup: true,
    cellRenderer: ({ row }) => {
      const responsavel = row.responsaveis.find(r => r.RotinaResponsavel ? Number(r.RotinaResponsavel.tipo_id) === 2 : null);
      return responsavel ? responsavel.nome : null;
    },
  },
  linkPop: {
    label: 'POP',
    width: 50,
    align: 'center',
    onClick: () => null,
    cellRenderer: ({ row }) => {
      return <Icon onClick={() => window.open(row.linkPop, '_blank')}>article</Icon>
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
  const filter = props.filter.rotina;
  const [response] = getDados({ filter });
  const filterResponsaveis = filter.responsavel_id;
  useEffect(() => {
    setData(!filterResponsaveis ? response : response.filter(r => r.responsaveis.map(responsavel => responsavel.id).some(id => filterResponsaveis.includes(id))));
  }, [response]);

  return (
    <div>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs={2}>
          <SelectStatusRotina
            value={filter.status_id}
            onChange={({ id, value }) => props.setFilter({ id, value, filter: 'rotina' })}
            isMulti />
        </Grid>
        <Grid item xs={2}>
          <Select
            id="automatica"
            label="Automática"
            options={options.automatica}
            value={filter.automatica}
            onChange={({ id, value }) => props.setFilter({ id, value, filter: 'rotina' })}
            isMulti />
        </Grid>
        <Grid item xs={2}>
          <SelectTipoRotina
            value={filter.tipo_id}
            onChange={({ id, value }) => props.setFilter({ id, value, filter: 'rotina' })}
            isMulti />
        </Grid>
        <Grid item xs={2}>
          <SelectPeriodicidadeRotina
            value={filter.periodicidade_id}
            onChange={({ id, value }) => props.setFilter({ id, value, filter: 'rotina' })}
            isMulti />
        </Grid>
        <Grid item xs={3}>
          <SelectUsuario
            id="responsavel_id"
            label="Responsável"
            value={filter.responsavel_id}
            onChange={({ id, value }) => props.setFilter({ id, value, filter: 'rotina' })}
            params={{ uor_id: 283521, order: ['nome'] }}
            isMulti
          />
        </Grid>
        <Grid item xs={1}>
          <ButtonLimparFiltros />
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

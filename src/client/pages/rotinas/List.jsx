import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFilter } from '~/store/filter';
import DataTable from '~/components/data-table/DataTable';
import SelectStatusRotina from '~/components/select/SelectStatusRotina';
import Icon from '~/components/icons/Icon';
import NavigationButton from '~/components/NavigationButton';

const Component = (props) => {

  return (
    <div>
      <DataTable
        url="/rotina/rotina"
        params={{ ...props.filter.rotina, order: ['nome'] }}
        count
        exportCsv
        headerHeight={80}
        onClick={({ row }) => props.history.push(`/rotina/${row.id}`)}
        actions={[
          <SelectStatusRotina
            label=""
            value={props.filter.rotina.status_id}
            onChange={({ id, value }) => props.setFilter({ id, value, filter: 'rotina' })}
            isMulti
            style={{ width: 300 }} />
        ]}
        columns={{
          'tipo.nome': {
            label: 'Célula',
            width: 100,
            search: true,
            lookup: true,
          },
          'periodicidade.nome': {
            label: 'Periodicidade',
            width: 110,
            search: true,
            lookup: true,
          },
          automatica: {
            label: 'Automática',
            width: 110,
            type: 'BOOLEAN',
            search: true,
            lookup: true,
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
        }}
      />

      <NavigationButton
        buttons={[{
          label: 'Adicionar Rotina',
          onClick: () => props.history.push('/rotina/0'),
        }]}
      />
    </div>
  )
};

Component.propTypes = {};
const mapStateToProps = ({ filter }) => ({ filter });
const mapDispatchToProps = ({ setFilter });

export default connect(mapStateToProps, mapDispatchToProps)(Component);
